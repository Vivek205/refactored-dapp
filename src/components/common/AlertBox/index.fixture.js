import React from "react";
import AlertBox, { alertTypes } from "./";

const props = { type: alertTypes.ERROR, message: "Alert Box", classes: {} };

export default () => <AlertBox {...props} />;
