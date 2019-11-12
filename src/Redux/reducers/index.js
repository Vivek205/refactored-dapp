import { combineReducers } from "redux";
import userReducer from "./UserReducer";
import serviceReducer from "./ServiceReducer";
import serviceDetailsReducer from "./ServiceDetailsReducer";
import errorReducer from "./ErrorReducer";
import loaderReducer from "./LoaderReducer";
import stylesReducer from "./StylesReducer";
import paymentReducer from "./PaymentReducer";
import modalsReducer from "./ModalsReducer";

const rootReducer = combineReducers({
  userReducer,
  serviceReducer,
  serviceDetailsReducer,
  errorReducer,
  loaderReducer,
  stylesReducer,
  paymentReducer,
  modalsReducer,
});

export default rootReducer;
