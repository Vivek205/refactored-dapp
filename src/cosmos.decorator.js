import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./assets/Theme";

export default ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;
