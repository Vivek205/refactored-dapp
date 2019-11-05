import React from "react";

import StyledButton from "./";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../../../assets/Theme";

export default () => (
  <ThemeProvider theme={theme}>
    <StyledButton btnText="Hello" />
  </ThemeProvider>
);
