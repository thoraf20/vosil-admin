import {
  CHARGES_REQUEST,
  CHARGES_SUCCESS,
  CHARGES_FAIL,
  CHARGES_RESET,
  DELETE_CHARGES_SUCCESS,
  DELETE_CHARGES_FAIL,
  DELETE_CHARGES_RESET
} from "../constants/charges.js"

export const chargesReducer = (state= {allData: [], loading: false, error: '', count: 0, message:'' }, action) => {
  switch (action.type) {
    case CHARGES_REQUEST: 
      return { loading : true};

  case CHARGES_SUCCESS:
    return { loading: false, allData: action.payload, count: action.payload.count };

  case CHARGES_FAIL:
    return {loading: false, error: action.payload };

  case CHARGES_RESET:
    return { allData: [] };

  case DELETE_CHARGES_SUCCESS:
    const newData = state.allData.filter(item => item._id !== action.payload)
    return {
      loading: false, success: true, 
      allData: newData,
      message: action.payload.msg, count: state.count - 1
    };
  
  case DELETE_CHARGES_FAIL:
    return {loading: false, error: action.payload, allData: [...state.allData] };

  case DELETE_CHARGES_RESET:
    return { allData: [] };

    default:
      return state;
  }
}