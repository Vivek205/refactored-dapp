import React, { Component } from "react";
import { withStyles } from "@mui/styles";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Typography from "@mui/material/Typography";
import { connect } from "react-redux";

import AlertBox, { alertTypes } from "../../../../../common/AlertBox";
import { useStyles } from "./styles";
import { walletTypes } from "../../../../../../Redux/actionCreators/UserActions";
import StyledDropdown from "../../../../../common/StyledDropdown";
import PaymentInfoCard from "../PaymentInfoCard";
import isEmpty from "lodash/isEmpty";
import { userActions, loaderActions } from "../../../../../../Redux/actionCreators";
import WalletDetailsToggler from "./WalletDetailsToggler";
import { channelInfo } from "../../../../../../Redux/reducers/UserReducer";
import { anyPendingTxn, anyFailedTxn } from "../../../../../../Redux/reducers/PaymentReducer";
import { LoaderContent } from "../../../../../../utility/constants/LoaderContent";
import { initPaypalSdk } from "../../../../../../utility/sdk";

const TransactionAlert = {
  PENDING: { type: alertTypes.WARNING, message: "Transaction Confirmed. Pending token allocation" },
  FAILED: { type: alertTypes.ERROR, message: "Transaction Failed. See history for more details" },
};

class ExpiredSession extends Component {
  state = {
    isMetamaskConnected: false,
    alert: {},
  };

  transactionAlert = () => {
    const { anyPendingTxn, anyFailedTxn, wallet } = this.props;
    if (wallet.type === walletTypes.GENERAL && anyPendingTxn) {
      return TransactionAlert.PENDING;
    }
    if (wallet.type === walletTypes.GENERAL && anyFailedTxn) {
      return TransactionAlert.FAILED;
    }
    return {};
  };

  componentDidMount = () => {
    this.setState({ alert: this.transactionAlert() });
    this.props.setIsLastPaidCall(false);
    if (process.env.REACT_APP_SANDBOX || this.props.wallet.type !== walletTypes.GENERAL) {
      initPaypalSdk(this.props.wallet.address, channelInfo);
    }
  };

  handlePayTypeChange = (event) => {
    const { value } = event.target;
    const { updateWallet } = this.props;
    this.setState({ alert: {} });
    updateWallet({ type: value });
  };

  render() {
    const { classes, wallet, handleComplete, handlePurchaseError, isServiceAvailable, channelInfo, setIsLastPaidCall } =
      this.props;
    const { alert } = this.state;
    const channelPaymentOptions = [
      { value: walletTypes.GENERAL, label: "PayPal" },
      { value: walletTypes.METAMASK, label: "Metamask" },
    ];
    return (
      <div className={classes.mainContainer}>
        <Typography variant="body1" className={classes.description}>
          You have run out of free trial. Please select a payment method to continue
        </Typography>
        <div className={classes.paymentChannelAndDetails}>
          <div className={classes.paymentChannelDropDownContainer}>
            <div className={classes.paymentChannelDropDown}>
              <Typography className={classes.dropDownTitle} variant="subtitle1">
                Payment Type
              </Typography>
              <AccountBalanceWalletIcon className={classes.walletIcon} />
              <StyledDropdown list={channelPaymentOptions} value={wallet.type} onChange={this.handlePayTypeChange} />
            </div>
          </div>
          {wallet.type === walletTypes.GENERAL && (
            <div className={classes.channelBalance}>
              <PaymentInfoCard
                show={!isEmpty(channelInfo) && wallet.type === walletTypes.GENERAL}
                title="Channel Balance"
                value={!isEmpty(channelInfo) && channelInfo.balanceInAgi}
                unit="AGIX"
              />
            </div>
          )}
          <WalletDetailsToggler
            metamask={wallet.type === walletTypes.METAMASK}
            generalWalletProps={{ handleContinue: handleComplete }}
            metamaskProps={{
              handleContinue: handleComplete,
              setIsLastPaidCall,
              handlePurchaseError,
              isServiceAvailable,
            }}
          />
        </div>
        <AlertBox {...alert} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  wallet: state.userReducer.wallet,
  channelInfo: channelInfo(state),
  anyPendingTxn: anyPendingTxn(state),
  anyFailedTxn: anyFailedTxn(state),
});

const mapDispatchToProps = (dispatch) => ({
  updateWallet: (args) => dispatch(userActions.updateWallet(args)),
  registerWallet: (address, type) => dispatch(userActions.registerWallet(address, type)),
  startChannelSetupLoader: () => dispatch(loaderActions.startAppLoader(LoaderContent.SETUP_CHANNEL_FOR_SERV_EXEC)),
  stopLoader: () => dispatch(loaderActions.stopAppLoader()),
  // stopWalletDetailsPolling: () => dispatch(userActions.stopWalletDetailsPolling),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(ExpiredSession));
