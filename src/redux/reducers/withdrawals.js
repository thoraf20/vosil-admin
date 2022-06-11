import {
  WITHDRAWAL_REQUEST,
  WITHDRAWAL_SUCCESS,
  WITHDRAWAL_FAIL,
  WITHDRAWAL_RESET
} from "../constants/withdrawals.js"

export const withdrawalsReducer = (state= {allData: [] }, action) => {
  switch (action.type) {
    case  WITHDRAWAL_REQUEST: 
      return { loading : true};

  case  WITHDRAWAL_SUCCESS:
    return {loading: false, allData: action.payload };

  case  WITHDRAWAL_FAIL:
    return {loading: false, error: action.payload };

  case  WITHDRAWAL_RESET:
    return { allData: [] };

    default:
      return state;
  }
}