import React from "react";
import MetamaskFlow from "./MetamaskFlow";
import GeneralAccountWallet from "./GeneralAccountWallet";

const WalletDetailsToggler = ({ metamask, metamaskProps, generalWalletProps, show, orgName }) => {
  if (!show) {
    return null;
  }
  if (metamask) {
    return <MetamaskFlow {...metamaskProps} />;
  }
  return <GeneralAccountWallet {...generalWalletProps} orgName={orgName} />;
};

export default WalletDetailsToggler;
