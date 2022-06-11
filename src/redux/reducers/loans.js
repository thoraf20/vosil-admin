import {
  LOAN_REQUEST,
  LOAN_SUCCESS,
  LOAN_FAIL,
  LOAN_RESET
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