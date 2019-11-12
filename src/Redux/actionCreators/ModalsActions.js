export const NETWORK_CHANGE_OVERLAY = "NETWORK_CHANGE_OVERLAY_MODAL";

// export const OPEN_NETWORK_CHANGE_OVERLAY = "OPEN_NETWORK_CHANGE_OVERLAY_MODAL";
// export const CLOSE_NETWORK_CHANGE_OVERLAY = "CLOSE_NETWORK_CHANGE_OVERLAY_MODAL";
export const SET_NETWORK_CHANGE_OVERLAY = "SET_NETWORK_CHANGE_OVERLAY";

export const openNetworkChangeOverlay = dispatch => {
  dispatch({ type: SET_NETWORK_CHANGE_OVERLAY, payload: true });
};

export const closeNetworkChangeOverlay = dispatch => {
  dispatch({ type: SET_NETWORK_CHANGE_OVERLAY, payload: false });
};

export const setNetworkChangeOverlay = show => dispatch => {
  dispatch({ type: SET_NETWORK_CHANGE_OVERLAY, payload: show });
};
