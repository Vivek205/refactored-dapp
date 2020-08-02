import React from "react";

import ActiveSession from "./ActiveSession";
import ExpiredSession from "./ExpiredSession";

const Purchase = ({
  handleComplete,
  freeCallsRemaining,
  freeCallsAllowed,
  wallet,
  orgName,
  groupInfo,
  handlePurchaseError,
  isServiceAvailable,
}) => {
  if (freeCallsRemaining <= 0) {
    return (
      <ExpiredSession
        handleComplete={handleComplete}
        wallet={wallet}
        groupInfo={groupInfo}
        handlePurchaseError={handlePurchaseError}
        isServiceAvailable={isServiceAvailable}
        orgName={orgName}
      />
    );
  }
  return (
    <ActiveSession
      freeCallsRemaining={freeCallsRemaining}
      freeCallsAllowed={freeCallsAllowed}
      handleComplete={handleComplete}
      isServiceAvailable={isServiceAvailable}
    />
  );
};

export default Purchase;
