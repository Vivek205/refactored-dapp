import React from "react";
import PaymentPopup from "./PaymentPopup";
import { paymentTitles } from "./";
import { orderTypes } from "../../../../../../../utility/constants/PaymentConstants";

const CreateWallet = ({ visible, setVisibility, orgName }) => {
  return (
    <PaymentPopup
      visible={visible}
      handleClose={() => setVisibility(false)}
      orderType={orderTypes.CREATE_WALLET}
      title={paymentTitles.CREATE_WALLET}
      orgName={orgName}
    />
  );
};

export default CreateWallet;
