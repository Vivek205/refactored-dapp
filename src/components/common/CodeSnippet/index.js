import React from "react";
import { withStyles } from "@mui/styles";

import { useStyles } from "./styles";

const CodeSnippet = ({ classes, children }) => {
  return (
    <section className={classes.codeSnippetContainer}>
      <div className={classes.codeSnippet}>{children}</div>
    </section>
  );
};

export default withStyles(useStyles)(CodeSnippet);
