import React from "react";
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import * as Sentry from "@sentry/browser";

import "./index.css";
import "./assets/icomoon.css";
import configureStore from "./Redux/Store";
import SnetApp from "./SnetApp";

if (process.env.NODE_ENV === "production") {
  Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DSN });
}

export const store = configureStore();

const root = createRoot(document.getElementById("root"));
root.render(
  <ReduxProvider store={store}>
    <SnetApp />
  </ReduxProvider>
);
