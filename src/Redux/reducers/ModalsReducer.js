import { modalsActions } from "../actionCreators";

const InitialModalsState = {};

const modalsReducer = (state = InitialModalsState, action) => {
  switch (action.type) {
    case modalsActions.SET_NETWORK_CHANGE_OVERLAY:
      return { ...state, [modalsActions.NETWORK_CHANGE_OVERLAY]: action.payload };
    default:
      return state;
  }
};

export default modalsReducer;
