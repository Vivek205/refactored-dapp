import React, { Component } from "react";
import { connect } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/styles";
import { WebServiceClient as ServiceClient } from "snet-sdk-web";

import StyledButton from "../../../../../../common/StyledButton";
import PaymentInfoCard from "../../PaymentInfoCard";
import PurchaseDialog from "../../PurchaseDialog";
import ChannelSelectionBox from "../../ChannelSelectionBox";
import AlertBox, { alertTypes } from "../../../../../../common/AlertBox";
import { initSdk } from "../../../../../../../utility/sdk";
import { cogsToAgi } from "../../../../../../../utility/PricingStrategy";
import { currentServiceDetails, pricing } from "../../../../../../../Redux/reducers/ServiceDetailsReducer";
import PaymentChannelManagement from "../../../../../../../utility/PaymentChannelManagement";
import { loaderActions, userActions } from "../../../../../../../Redux/actionCreators";
import { LoaderContent } from "../../../../../../../utility/constants/LoaderContent";
import { useStyles } from "./style";
import { walletTypes } from "../../../../../../../Redux/actionCreators/UserActions";

const payTypes = {
  CHANNEL_BALANCE: "CHANNEL_BALANCE",
  MULTIPLE_CALLS: "MULTIPLE_CALLS",
  SINGLE_CALL: "SINGLE_CALL",
};

const connectMMinfo = {
  type: alertTypes.ERROR,
  message: `Please install Metamask and use your Metamask wallet to connect to SingularityNet. 
Click below to install and learn more about how to use Metamask and your AGIX credits with SinguarlityNet AI Marketplace.`,
};

const MIN_CALLS_NUMBER = 1;
class MetamaskFlow extends Component {
  state = {
    MMconnected: false,
    mpeBal: "0",
    selectedPayType: payTypes.CHANNEL_BALANCE,
    disabledPayTypes: [],
    showPurchaseDialog: false,
    noOfServiceCalls: 1,
    totalPrice: cogsToAgi(this.props.pricing.price_in_cogs),
    alert: {},
    showTooltip: false,
  };

  sdk;

  serviceClient;

  paymentChannelManagement;

  componentDidMount = () => {
    this.initializePaymentChannel();
  };

  initializePaymentChannel = async () => {
    try {
      const {
        serviceDetails: { org_id, service_id },
        groupInfo,
      } = this.props;
      this.sdk = await initSdk();
      this.serviceClient = new ServiceClient(this.sdk, org_id, service_id, this.sdk._mpeContract, {}, groupInfo);
      this.paymentChannelManagement = new PaymentChannelManagement(this.sdk, this.serviceClient);
    } catch (error) {
      this.props.handlePurchaseError("Unable to initialize payment channel. Please try again");
    }
  };

  PaymentInfoCardData = [
    {
      title: "Escrow Balance",
      value: this.state.mpeBal,
      unit: "AGIX",
    },
    {
      title: "Channel Balance",
      value: this.state.channelBalance,
      unit: "AGIX",
    },
  ];

  handleDisabledPaytypes = (channelBalance, mpeBal) => {
    const disabledPayTypes = [];
    let { selectedPayType } = this.state;

    if (channelBalance <= 0 && !disabledPayTypes.includes(payTypes.CHANNEL_BALANCE)) {
      disabledPayTypes.push(payTypes.CHANNEL_BALANCE);
      selectedPayType = "";
    }
    if (mpeBal <= 0) {
      if (!disabledPayTypes.includes(payTypes.SINGLE_CALL)) {
        disabledPayTypes.push(payTypes.SINGLE_CALL);
      }
      if (!disabledPayTypes.includes(payTypes.MULTIPLE_CALLS)) {
        disabledPayTypes.push(payTypes.MULTIPLE_CALLS);
      }
    }
    this.setState({ disabledPayTypes, selectedPayType });
  };

  handleConnectMM = async () => {
    const { startMMconnectLoader, stopLoader, registerWallet, updateWallet, fetchAvailableUserWallets } = this.props;
    this.setState({ alert: {} });
    try {
      startMMconnectLoader();
      if (!this.sdk) {
        this.initializePaymentChannel();
      }
      const mpeBal = await this.sdk.account.escrowBalance();
      await this.paymentChannelManagement.updateChannelInfo();
      const address = await this.sdk.account.getAddress();
      const availableUserWallets = await fetchAvailableUserWallets();
      const addressAlreadyRegistered = availableUserWallets.some(
        (wallet) => wallet.address.toLowerCase() === address.toLowerCase()
      );
      if (!addressAlreadyRegistered) {
        await registerWallet(address, walletTypes.METAMASK);
      }

      updateWallet({ type: walletTypes.METAMASK, address });
      this.PaymentInfoCardData.map((el) => {
        if (el.title === "Escrow Balance") {
          el.value = cogsToAgi(mpeBal);
        }
        if (el.title === "Channel Balance") {
          el.value = cogsToAgi(this.paymentChannelManagement.availableBalance());
        }
        return el;
      });
      const channelBalance = this.paymentChannelManagement.availableBalance();
      this.handleDisabledPaytypes(channelBalance, mpeBal);

      this.setState({ MMconnected: true, mpeBal, channelBalance });
    } catch (error) {
      this.setState({ alert: { type: connectMMinfo.type, message: connectMMinfo.message } });
    }
    stopLoader();
  };

  handlePayTypeChange = (value) => {
    const { disabledPayTypes, selectedPayType } = this.state;
    if (disabledPayTypes.includes(value) || selectedPayType === value) {
      return;
    }
    this.setState({ selectedPayType: value });
  };

  handlePurchaseDialogOpen = () => {
    this.setState({ showPurchaseDialog: true });
  };

  handlePurchaseDialogClose = () => {
    this.setState({ showPurchaseDialog: false });
  };

  isValidCallsNumber = (numberOfCalls) => {
    const isMoreOrEqualThanMinimum = numberOfCalls >= MIN_CALLS_NUMBER;
    const isInteger = numberOfCalls % 1 === 0;
    const isNumber = Number(numberOfCalls);
    return isMoreOrEqualThanMinimum && isInteger && isNumber;
  };

  handleNoOfCallsChange = (event) => {
    const noOfServiceCalls = event.target.value;
    console.log(noOfServiceCalls);
    if (!this.isValidCallsNumber(noOfServiceCalls)) {
      return;
    }
    const totalPrice = String(cogsToAgi(this.paymentChannelManagement.noOfCallsToCogs(noOfServiceCalls)));
    this.setState({ noOfServiceCalls, totalPrice });
  };

  handleSubmit = async () => {
    this.props.startChannelSetupLoader();
    this.setState({ alert: {} });

    let { noOfServiceCalls, selectedPayType } = this.state;
    if (selectedPayType === payTypes.CHANNEL_BALANCE) {
      try {
        const isChannelNearToExpiry = await this.paymentChannelManagement.isChannelNearToExpiry();
        if (isChannelNearToExpiry) {
          await this.paymentChannelManagement.extendChannel();
        }
        this.props.handleContinue();
      } catch (e) {
        this.setState({ alert: { type: alertTypes.ERROR, message: e.message } });
      }
      this.props.stopLoader();
      return;
    }
    if (selectedPayType === payTypes.SINGLE_CALL) {
      noOfServiceCalls = 1;
    }
    try {
      const sdk = await initSdk();
      const mpeBal = await sdk.account.escrowBalance();
      if (mpeBal < this.paymentChannelManagement.noOfCallsToCogs(noOfServiceCalls)) {
        this.setState({
          mpeBal,
          alert: {
            type: alertTypes.ERROR,
            message: `Insufficient MPE balance. Please deposit some AGIX tokens to your escrow account`,
          },
        });
        return;
      }
      if (!this.paymentChannelManagement.channel) {
        await this.paymentChannelManagement.openChannel(noOfServiceCalls);
      } else {
        await this.paymentChannelManagement.extendAndAddFunds(noOfServiceCalls);
      }

      this.props.handleContinue();
      this.props.stopLoader();
    } catch (error) {
      this.setState({ alert: { type: alertTypes.ERROR, message: `Unable to execute the call` } });
      this.props.stopLoader();
    }
  };

  parseChannelBalFromPaymentCard = () => {
    return this.PaymentInfoCardData.find((el) => el.title === "Channel Balance").value;
  };

  shouldContinueBeEnabled = () => {
    const { mpeBal, totalPrice, channelBalance, selectedPayType } = this.state;
    return (
      selectedPayType &&
      this.props.isServiceAvailable &&
      (Number(mpeBal) >= Number(totalPrice) || Number(channelBalance) >= Number(totalPrice))
    );
  };

  shouldDepositToEscrowBeHighlighted = () => this.state.mpeBal <= 0;

  handleTooltipOpen = () => {
    if (!this.props.isServiceAvailable) {
      this.setState({ showTooltip: true });
    }
  };

  handleTooltipClose = () => {
    this.setState({ showTooltip: false });
  };

  render() {
    const { classes } = this.props;
    const {
      MMconnected,
      showPurchaseDialog,
      selectedPayType,
      disabledPayTypes,
      noOfServiceCalls,
      totalPrice,
      alert,
      showTooltip,
    } = this.state;

    if (!MMconnected) {
      return (
        <div className={classes.ExpiredSessionContainer}>
          <AlertBox type={alert.type} message={alert.message} />
          <StyledButton type="blue" btnText="connect metamask" onClick={this.handleConnectMM} />
        </div>
      );
    }
    return (
      <div className={classes.PurchaseFlowContainer}>
        <PurchaseDialog show={showPurchaseDialog} onClose={this.handlePurchaseDialogClose} />
        <div className={classes.paymentInfoCard}>
          {this.PaymentInfoCardData.map((item) => (
            <PaymentInfoCard key={item.title} title={item.title} value={item.value} unit={item.unit} />
          ))}
        </div>
        <div className={classes.ChannelSelectionBoxMainContainer}>
          <div>
            <span className={classes.channelSelectionTitle}>Recommended</span>
            <ChannelSelectionBox
              title="Channel Balance"
              description={`You have ${Number(this.parseChannelBalFromPaymentCard())} AGIX in you channel. This can be used for running demos across all the services from this vendor.`}
              checked={selectedPayType === payTypes.CHANNEL_BALANCE}
              value={payTypes.CHANNEL_BALANCE}
              onClick={() => this.handlePayTypeChange(payTypes.CHANNEL_BALANCE)}
              disabled={disabledPayTypes.includes(payTypes.CHANNEL_BALANCE)}
            />
          </div>
          <div>
            <span className={classes.channelSelectionTitle}>Best Value</span>
            <ChannelSelectionBox
              title="Multiple Calls"
              description="Select the no of calls you want to make. The tokens are purchased from the available escrow balance. This  option helps save the gas cost."
              checked={selectedPayType === payTypes.MULTIPLE_CALLS}
              value={payTypes.MULTIPLE_CALLS}
              onClick={() => this.handlePayTypeChange(payTypes.MULTIPLE_CALLS)}
              inputProps={{
                noOfServiceCalls,
                onChange: this.handleNoOfCallsChange,
                totalPrice,
                unit: "AGIX",
              }}
              disabled={disabledPayTypes.includes(payTypes.MULTIPLE_CALLS)}
            />
            <ChannelSelectionBox
              title="Single Call"
              description="Tokens are purchsed for a single call. The tokens are purchsed from the available escrow balance."
              checked={selectedPayType === payTypes.SINGLE_CALL}
              value={payTypes.SINGLE_CALL}
              onClick={() => this.handlePayTypeChange(payTypes.SINGLE_CALL)}
              inputProps={{
                totalPrice: cogsToAgi(this.props.pricing.price_in_cogs),
                unit: "AGIX",
                noInput: true,
              }}
              disabled={disabledPayTypes.includes(payTypes.SINGLE_CALL)}
            />
          </div>
        </div>
        <AlertBox type={alert.type} message={alert.message} />
        <div className={classes.buttonContainer}>
          <StyledButton
            type={this.shouldDepositToEscrowBeHighlighted() ? "blue" : "transparent"}
            btnText="Deposit into Escrow"
            onClick={this.handlePurchaseDialogOpen}
          />
          <Tooltip
            title="Service is currently offline. Please try after sometime"
            aria-label="add-payment"
            open={showTooltip}
            onOpen={this.handleTooltipOpen}
            onClose={this.handleTooltipClose}
            className={classes.tooltip}
            classes={classes}
          >
            <div>
              <StyledButton
                type="blue"
                btnText="Continue"
                onClick={this.handleSubmit}
                disabled={!this.shouldContinueBeEnabled()}
              />
            </div>
          </Tooltip>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  serviceDetails: currentServiceDetails(state),
  pricing: pricing(state),
  wallet: state.userReducer.wallet,
  walletList: state.userReducer.walletList,
});

const mapDispatchToProps = (dispatch) => ({
  startMMconnectLoader: () => dispatch(loaderActions.startAppLoader(LoaderContent.CONNECT_METAMASK)),
  startChannelSetupLoader: () => dispatch(loaderActions.startAppLoader(LoaderContent.SETUP_CHANNEL_FOR_SERV_EXEC)),
  updateWallet: ({ type, address }) => dispatch(userActions.updateWallet({ type, address })),
  registerWallet: (address, type) => dispatch(userActions.registerWallet(address, type)),
  fetchAvailableUserWallets: () => dispatch(userActions.fetchAvailableUserWallets()),
  stopLoader: () => dispatch(loaderActions.stopAppLoader),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(MetamaskFlow));
