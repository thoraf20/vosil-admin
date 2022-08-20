import {
  WITHDRAWAL_REQUEST,
  WITHDRAWAL_SUCCESS,
  WITHDRAWAL_FAIL,
  WITHDRAWAL_RESET,
  CREATE_WITHDRAWAL_REQUEST,
  CREATE_WITHDRAWAL_SUCCESS,
  CREATE_WITHDRAWAL_FAIL,
  CREATE_WITHDRAWAL_RESET,
  SINGLE_WIDTHDRAWALS_SUCCESS,
  SINGLE_WIDTHDRAWALS_FAIL,
  SINGLE_WIDTHDRAWALS_RESET,
  SINGLE_WIDTHDRAWALS_REQUEST
} from "../constants/withdrawals.js"

export const withdrawalsReducer = (state= {allData: [], loading: false, error: '', count: 0, message:'' }, action) => {
  switch (action.type) {
    case  WITHDRAWAL_REQUEST: 
      return { loading : true};

  case  WITHDRAWAL_SUCCESS:
    return {loading: false, allData: action.payload.withdrawals, count: action.payload.count };

  case  WITHDRAWAL_FAIL:
    return {loading: false, error: action.payload };

  case  WITHDRAWAL_RESET:
    return { allData: [] };

  case  CREATE_WITHDRAWAL_REQUEST: 
    return { loading : true, ...state };

  case  CREATE_WITHDRAWAL_SUCCESS:
    return {
      loading: false, success: true, 
      allData: [action.payload.withdrawals, ...state.allData], 
      message: action.payload.msg, count: state.count + 1
    };

  case  CREATE_WITHDRAWAL_FAIL:
    return {loading: false, error: action.payload };

  case  CREATE_WITHDRAWAL_RESET:
    return { allData: [] };

    default:
      return state;
  }
}

export const singleWithdrawalsReducer = (state= {allData: [] }, action) => {
  switch (action.type) {
    case SINGLE_WIDTHDRAWALS_REQUEST: 
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

// export const createWithdrawalsReducer = (state= {allData: [] }, action) => {
//   switch (action.type) {
//     case  CREATE_WITHDRAWAL_REQUEST: 
//       return { loading : true};

//   case  CREATE_WITHDRAWAL_SUCCESS:
//     return {loading: false, success: true, allData: action.payload };

//   case  CREATE_WITHDRAWAL_FAIL:
//     return {loading: false, error: action.payload };

//   case  CREATE_WITHDRAWAL_RESET:
//     return { allData: [] };

//     default:
//       return state;
//   }
// }