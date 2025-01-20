import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";

import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import StyledButton from "../../../common/StyledButton";
import AlertBox, { alertTypes } from "../../../common/AlertBox";
import { agiToCogs, txnTypes } from "../../../../utility/PricingStrategy";
import { loaderActions, sdkActions } from "../../../../Redux/actionCreators";
import { LoaderContent } from "../../../../utility/constants/LoaderContent";

import { withStyles } from "@mui/styles";
import { useStyles } from "./styles";
import StyledTextField from "../../../common/StyledTextField";

const successAlert = {
  [txnTypes.WITHDRAW]: "Successfully withdrawn",
  [txnTypes.DEPOSIT]: "Successfully deposited",
};

const errorAlert = {
  [txnTypes.WITHDRAW]: "Unable to withdraw amount",
  [txnTypes.DEPOSIT]: "Unable to deposit amount",
};

const MPEActionTabs = ({ classes }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [amount, setAmount] = useState({});
  const [alert, setAlert] = useState({});

  const dispatch = useDispatch();

  const onTabChange = (event, newValue) => {
    setAlert({});
    setActiveTab(newValue);
  };

  const handleAmountChange = (event, txnType) => {
    const { value } = event.target;
    setAmount({ ...amount, [txnType]: value });
  };

  const startLoader = {
    [txnTypes.WITHDRAW]: () => dispatch(loaderActions.startAppLoader(LoaderContent.WITHDRAW)),
    [txnTypes.DEPOSIT]: () => dispatch(loaderActions.startAppLoader(LoaderContent.DEPOSIT)),
  };

  const MPEAction = async () => {
    const sdk = await dispatch(sdkActions.getSdk());
    return {
      [txnTypes.WITHDRAW]: () => sdk.account.withdrawFromEscrowAccount,
      [txnTypes.DEPOSIT]: () => sdk.account.depositToEscrowAccount,
    };
  };

  const handleMPEAction = async () => {
    const txnType = activeTab;
    setAlert({});
    startLoader[txnType]();
    try {
      const amountInAGI = amount[txnType];
      const amountInCogs = agiToCogs(amountInAGI);
      await MPEAction[txnType](amountInCogs);
      setAlert({ type: alertTypes.SUCCESS, message: successAlert[txnType] });
    } catch (error) {
      setAlert({ type: alertTypes.ERROR, message: errorAlert[txnType] });
    } finally {
      dispatch(loaderActions.stopAppLoader());
    }
  };

  const tabs = [
    {
      name: txnTypes.DEPOSIT,
      activeIndex: 0,
      component: (
        <StyledTextField
          label="Amount to be deposited in AGIX"
          value={amount[txnTypes.DEPOSIT] || ""}
          onChange={(event) => handleAmountChange(event, txnTypes.DEPOSIT)}
        />
      ),
    },
    {
      name: txnTypes.WITHDRAW,
      activeIndex: 1,
      component: (
        <StyledTextField
          label="Amount to be withdrawn in AGIX"
          value={amount[txnTypes.WITHDRAW] || ""}
          onChange={(event) => handleAmountChange(event, txnTypes.WITHDRAW)}
        />
      ),
    },
  ];
  const activeComponent = tabs[activeTab];

  return (
    <Fragment>
      <div className={classes.tabsContainer}>
        <AppBar position="static" className={classes.tabsHeader}>
          <Tabs value={activeTab} onChange={onTabChange}>
            {tabs.map((value) => (
              <Tab key={value.name} label={value.name} />
            ))}
          </Tabs>
        </AppBar>
        {activeComponent.component}
        <AlertBox type={alert.type} message={alert.message} />
      </div>
      <div className={classes.btnContainer}>
        <StyledButton
          type="blue"
          btnText={activeComponent.name}
          onClick={() => handleMPEAction(activeComponent.name)}
        />
      </div>
    </Fragment>
  );
};

export default withStyles(useStyles)(MPEActionTabs);
