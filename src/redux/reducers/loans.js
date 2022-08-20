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

export const loansReducer = (state= {allData: [], loading: false, error: '', count: 0, message:'' }, action) => {
  switch (action.type) {
    case LOAN_REQUEST: 
      return { loading : true};

  case LOAN_SUCCESS:
    return { loading: false, allData: action.payload.loans, count: action.payload.count };

  case LOAN_FAIL:
    return {loading: false, error: action.payload };

  case LOAN_RESET:
    return { allData: [] };

  case CREATE_LOAN_REQUEST: 
    return { loading : true, ...state };

  case CREATE_LOAN_SUCCESS:
    return {
      loading: false, success: true, 
      allData: [action.payload.loans, ...state.allData], 
      message: action.payload.msg, count: state.count + 1
    };

  case CREATE_LOAN_FAIL:
    return {loading: false, error: action.payload };

  case CREATE_LOAN_RESET:
    return { allData: [] };

    default:
      return state;
  }
}

// export const createLoansReducer = (state= {allData: [] }, action) => {
//   switch (action.type) {
//     case CREATE_LOAN_REQUEST: 
//       return { loading : true};

//   case CREATE_LOAN_SUCCESS:
//     return {loading: false, success: true, allData: action.payload };

//   case CREATE_LOAN_FAIL:
//     return {loading: false, error: action.payload };

//   case CREATE_LOAN_RESET:
//     return { allData: [] };

//     default:
//       return state;
//   }
// }