import { serviceActions } from "../actionCreators";

const InitialServiceList = {
  result: [],
  searchKeyword: "",
  limit: 10,
  offset: 0,
  sort_by: "display_name",
  order_by: "desc",
  total_count: 0,
};

const serviceReducer = (state = InitialServiceList, action) => {
  switch (action.type) {
    case serviceActions.FETCH_SERVICE_LIST: {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
};

export default serviceReducer;