import { modalsActions } from "../actionCreators";

const InitialModalsState = {};

const modalsReducer = (state = InitialModalsState, action) => {
  switch (action.type) {
    case modalsActions.SET_NETWORK_CHANGE_OVERLAY:
      return { ...state, [modalsActions.NETWORK_CHANGE_OVERLAY]: action.payload };
    case modalsActions.SET_CREATE_WALLET_MODAL:
      return { ...state, [modalsActions.CREATE_WALLET_MODAL]: action.payload };
    case modalsActions.SET_TOPUP_WALLET_MODAL:
      return { ...state, [modalsActions.TOPUP_WALLET_MODAL]: action.payload };
    case modalsActions.SET_LINK_PROVIDER_MODAL:
      return { ...state, [modalsActions.LINK_PROVIDER_MODAL]: action.payload };
    case modalsActions.SET_PURCHASE_MODAL:
      return { ...state, [modalsActions.PURCHASE_MODAL]: action.payload };
    default:
      return state;
  }
};

export default modalsReducer;
