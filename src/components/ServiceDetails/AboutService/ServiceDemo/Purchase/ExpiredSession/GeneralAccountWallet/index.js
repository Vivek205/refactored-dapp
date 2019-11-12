import React, { Fragment, useEffect } from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import isEmpty from "lodash/isEmpty";

import StyledButton from "../../../../../../common/StyledButton";
import { useStyles } from "./styles";
import NextAction from "./NextAction";
import { channelInfo, anyGeneralWallet } from "../../../../../../../Redux/reducers/UserReducer";
import TopupWallet from "./TopupWallet";
import CreateWallet from "./CreateWallet";
import { paymentActions, modalsActions } from "../../../../../../../Redux/actionCreators";
import LinkProvider from "./LinkProvider";
import { userProfileRoutes } from "../../../../../../UserProfile";
import { anyPendingTxn } from "../../../../../../../Redux/reducers/PaymentReducer";
import { orderTypes } from "../../../../../../../utility/constants/PaymentConstants";

export const paymentTitles = {
  CREATE_WALLET: "Create General Account Wallet",
  TOPUP_WALLET: "Topup General Account Wallet",
  CREATE_CHANNEL: "Link Provider to General Account Wallet",
};

const GeneralAccountWallet = props => {
  const {
    classes,
    channelInfo,
    handleContinue,
    paypalInProgress,
    anyGeneralWallet,
    anyPendingTxn,
    showCreateWallet,
    setShowCreateWallet,
    showTopupWallet,
    setShowTopupWallet,
    showLinkProvider,
    setShowLinkProvider,
  } = props;

  useEffect(() => {
    switch (paypalInProgress.orderType) {
      case orderTypes.CREATE_WALLET: {
        setShowCreateWallet(true);
        return;
      }
      case orderTypes.TOPUP_WALLET: {
        setShowTopupWallet(true);
        return;
      }
      case orderTypes.CREATE_CHANNEL: {
        setShowLinkProvider(true);
        return;
      }
    }
  }, [paypalInProgress.orderType, setShowCreateWallet, setShowTopupWallet, setShowLinkProvider]);

  return (
    <Fragment>
      <div className={classes.btnsContainer}>
        <Link to={userProfileRoutes.TRANSACTIONS.path} className={classes.routerLink}>
          <StyledButton type="transparentBlueBorder" disabled={!anyGeneralWallet} btnText="transaction history" />
        </Link>
        <StyledButton
          type="transparentBlueBorder"
          btnText="top up wallet"
          onClick={() => setShowTopupWallet(true)}
          disabled={isEmpty(channelInfo)}
        />
        <NextAction
          channel={channelInfo}
          setShowCreateWalletPopup={setShowCreateWallet}
          setShowLinkProvider={setShowLinkProvider}
          handleContinue={handleContinue}
          anyPendingTxn={anyPendingTxn}
          anyGeneralWallet={anyGeneralWallet}
        />
      </div>
      <CreateWallet visible={showCreateWallet} setVisibility={setShowCreateWallet} />
      <TopupWallet visible={showTopupWallet} setVisibility={setShowTopupWallet} />
      <LinkProvider visible={showLinkProvider} setVisibility={setShowLinkProvider} />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  channelInfo: channelInfo(state),
  paypalInProgress: state.paymentReducer.paypalInProgress,
  wallet: state.userReducer.wallet,
  anyGeneralWallet: anyGeneralWallet(state),
  anyPendingTxn: anyPendingTxn(state),
  showCreateWallet: state.modalsReducer[modalsActions.CREATE_WALLET_MODAL],
  showTopupWallet: state.modalsReducer[modalsActions.TOPUP_WALLET_MODAL],
  showLinkProvider: state.modalsReducer[modalsActions.LINK_PROVIDER_MODAL],
});

const mapDispatchToProps = dispatch => ({
  fetchOrderDetails: orderId => dispatch(paymentActions.fetchOrderDetails(orderId)),
  setCreateWalletModal: show => dispatch(modalsActions.setCreateWalletModal(show)),
  setShowTopupWallet: show => dispatch(modalsActions.setTopupWalletModal(show)),
  setShowLinkProvider: show => dispatch(modalsActions.setLinkProviderModal(show)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(GeneralAccountWallet));
