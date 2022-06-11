import {
  CUSTOMER_REQUEST,
  CUSTOMER_SUCCESS,
  CUSTOMER_FAIL,
  CUSTOMER_RESET
} from "../constants/customers.js"

export const customerReducer = (state= {allData: [] }, action) => {
  switch (action.type) {
    case CUSTOMER_REQUEST: 
      return { loading : true};

  case CUSTOMER_SUCCESS:
    return {loading: false, allData: action.payload };

  case CUSTOMER_FAIL:
    return {loading: false, error: action.payload };

  case CUSTOMER_RESET:
    return { allData: [] };

    default:
      return state;
  }
}