import {
  WITHDRAWAL_REQUEST,
  WITHDRAWAL_SUCCESS,
  WITHDRAWAL_FAIL,
  WITHDRAWAL_RESET,
  CREATE_WITHDRAWAL_REQUEST,
  CREATE_WITHDRAWAL_SUCCESS,
  CREATE_WITHDRAWAL_FAIL,
  CREATE_WITHDRAWAL_RESET,
  CUSTOMER_WIDTHDRAWALS_REQUEST,
  SINGLE_WIDTHDRAWALS_SUCCESS,
  SINGLE_WIDTHDRAWALS_FAIL,
  SINGLE_WIDTHDRAWALS_RESET
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

export const singleWithdrawalsReducer = (state= {allData: [] }, action) => {
  switch (action.type) {
    case CUSTOMER_WIDTHDRAWALS_REQUEST: 
      return { loading : true};

  case SINGLE_WIDTHDRAWALS_SUCCESS:
    return {loading: false, success: true, allData: action.payload };

  case SINGLE_WIDTHDRAWALS_FAIL:
    return {loading: false, error: action.payload };

  case SINGLE_WIDTHDRAWALS_RESET:
    return { allData: [] };

    default:
      return state;
  }
}

export const createWithdrawalsReducer = (state= {allData: [] }, action) => {
  switch (action.type) {
    case  CREATE_WITHDRAWAL_REQUEST: 
      return { loading : true};

  case  CREATE_WITHDRAWAL_SUCCESS:
    return {loading: false, success: true, allData: action.payload };

  case  CREATE_WITHDRAWAL_FAIL:
    return {loading: false, error: action.payload };

  case  CREATE_WITHDRAWAL_RESET:
    return { allData: [] };

    default:
      return state;
  }
}