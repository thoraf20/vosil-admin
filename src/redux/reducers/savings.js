import {
  SAVING_REQUEST,
  SAVING_SUCCESS,
  SAVING_FAIL,
  SAVING_RESET,
  SINGLE_SAVING_REQUEST,
  SINGLE_SAVING_SUCCESS,
  SINGLE_SAVING_FAIL,
  SINGLE_SAVING_RESET,
  CREATE_SAVING_REQUEST,
  CREATE_SAVING_SUCCESS,
  CREATE_SAVING_FAIL,
  CREATE_SAVING_RESET,
  CHARGES_REQUEST,
  CHARGES_RESET,
  CHARGES_FAIL,
  CHARGES_SUCCESS,

} from "../constants/savings.js"
import { DELETE_STAFF_FAIL, DELETE_STAFF_REQUEST, DELETE_STAFF_RESET, DELETE_STAFF_SUCCESS } from "../constants/staffs.js";


export const savingsReducer = (state= {allData: [], loading: false, error: '', count: 0, message:'' }, action) => {
  switch (action.type) {
    case SAVING_REQUEST: 
      return { loading : true};

  case SAVING_SUCCESS:
    return {loading: false, allData: action.payload.savings, count: action.payload.count };

  case SAVING_FAIL:
    return {loading: false, error: action.payload };

  case SAVING_RESET:
    return { allData: [] };

    case CREATE_SAVING_REQUEST: 
    return { loading : true, ...state};

  case CREATE_SAVING_SUCCESS:
    return {
      loading: false, success: true, 
      allData: [action.payload.savings[0], ...state.allData], 
      message: action.payload.msg, count: state.count + 1
     };

  case CREATE_SAVING_FAIL:
    return {loading: false, error: action.payload };

  case CREATE_SAVING_RESET:
    return { allData: [] };

    case DELETE_STAFF_REQUEST: 
    return { loading : true, ...state};

  case DELETE_STAFF_SUCCESS:
    const newData = state.allData.filter(item => item._id !== action.payload)
    return {
      loading: false, success: true, 
      allData: newData,
      message: action.payload.msg, count: state.count - 1
    };

  case DELETE_STAFF_FAIL:
    return {loading: false, error: action.payload };

  case DELETE_STAFF_RESET:
    return { allData: [] };

      default:
        return state;
    }
}

export const singleSavingsReducer = (state= {allData: [], loading: false, error: '' }, action) => {
  switch (action.type) {
    case SINGLE_SAVING_REQUEST: 
      return { loading : true};

  case SINGLE_SAVING_SUCCESS:
    return {loading: false, success: true, allData: action.payload };

  case SINGLE_SAVING_FAIL:
    return {loading: false, error: action.payload };

  case SINGLE_SAVING_RESET:
    return { allData: [] };

    default:
      return state;
  }
}

export const savingChargesReducer = (state= {chargesData: [], loading: false, error: '' }, action) => {
  switch (action.type) {
    case CHARGES_REQUEST: 
      return { loading : true};

  case CHARGES_SUCCESS:
    return {loading: false, success: true, chargesData: action.payload };

  case CHARGES_FAIL:
    return {loading: false, error: action.payload };

  case CHARGES_RESET:
    return { chargesData: [] };

    default:
      return state;
  }
}