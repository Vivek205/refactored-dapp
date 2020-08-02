import React from "react";
import ThirdPartyAIService from "./ThirdPartyAIService";
import Purchase from "./Purchase";

const PurchaseToggler = ({ purchaseCompleted, purchaseProps, thirdPartyProps, groupInfo, orgName }) => {
  if (purchaseCompleted) {
    return <ThirdPartyAIService {...thirdPartyProps} groupInfo={groupInfo} />;
  }
  return <Purchase {...purchaseProps} groupInfo={groupInfo} orgName={orgName} />;
};

export default PurchaseToggler;
