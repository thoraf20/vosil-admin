import {
  LOAN_REQUEST,
  LOAN_SUCCESS,
  LOAN_FAIL,
  LOAN_RESET,
  CREATE_LOAN_REQUEST,
  CREATE_LOAN_SUCCESS,
  CREATE_LOAN_FAIL,
  CREATE_LOAN_RESET
} from "../constants/loans.js"

export const loansReducer = (state= {allData: [] }, action) => {
  switch (action.type) {
    case LOAN_REQUEST: 
      return { loading : true};

  case LOAN_SUCCESS:
    return {loading: false, allData: action.payload };

  case LOAN_FAIL:
    return {loading: false, error: action.payload };

  case LOAN_RESET:
    return { allData: [] };

    default:
      return state;
  }
}

export const createLoansReducer = (state= {allData: [] }, action) => {
  switch (action.type) {
    case CREATE_LOAN_REQUEST: 
      return { loading : true};

  case CREATE_LOAN_SUCCESS:
    return {loading: false, success: true, allData: action.payload };

  case CREATE_LOAN_FAIL:
    return {loading: false, error: action.payload };

  case CREATE_LOAN_RESET:
    return { allData: [] };

    default:
      return state;
  }
}