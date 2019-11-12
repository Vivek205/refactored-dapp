export const NETWORK_CHANGE_OVERLAY = "NETWORK_CHANGE_OVERLAY_MODAL";
export const CREATE_WALLET_MODAL = "CREATE_WALLET_MODAL";
export const TOPUP_WALLET_MODAL = "TOPUP_WALLET_MODAL";
export const LINK_PROVIDER_MODAL = "LINK_PROVIDER_MODAL";
export const PURCHASE_MODAL = "PURCHASE_MODAL";

export const SET_NETWORK_CHANGE_OVERLAY = "SET_NETWORK_CHANGE_OVERLAY";
export const SET_CREATE_WALLET_MODAL = "SET_CREATE_WALLET_MODAL";
export const SET_TOPUP_WALLET_MODAL = "SET_TOPUP_WALLET_MODAL";
export const SET_LINK_PROVIDER_MODAL = "SET_LINK_PROVIDER_MODAL";
export const SET_PURCHASE_MODAL = "SET_PURCHASE_MODAL";

export const setNetworkChangeOverlay = show => dispatch => {
  dispatch({ type: SET_NETWORK_CHANGE_OVERLAY, payload: show });
};

export const setCreateWalletModal = show => dispatch => {
  dispatch({ type: SET_CREATE_WALLET_MODAL, payload: show });
};

export const setTopupWalletModal = show => dispatch => {
  dispatch({ type: SET_TOPUP_WALLET_MODAL, payload: show });
};

export const setLinkProviderModal = show => dispatch => {
  dispatch({ type: SET_LINK_PROVIDER_MODAL, payload: show });
};

export const setPurchaseModal = show => dispatch => {
  dispatch({ type: SET_PURCHASE_MODAL, payload: show });
};
