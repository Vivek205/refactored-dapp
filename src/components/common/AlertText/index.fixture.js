import AlertText from "./";
import { alertTypes } from "../AlertBox";

const component = AlertText;

const props = {
  message: "Alert Sucess",
  type: alertTypes.SUCCESS,
  inline: false,
};

export default {
  component,
  props,
};
