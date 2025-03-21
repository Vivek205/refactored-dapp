import React from "react";
import { withStyles } from "@mui/styles";

import { useStyles } from "./styles";

const Deposit = ({ classes }) => {
  return (
    <div className={classes.depositAmtContainer}>
      <span>AGIX Token Amount</span>
    </div>
  );
};

export default withStyles(useStyles)(Deposit);
