import {
  EXCESS_REQUEST,
  EXCESS_SUCCESS,
  EXCESS_FAIL,
  EXCESS_RESET,
  DELETE_EXCESS_REQUEST,
  DELETE_EXCESS_SUCCESS,
  DELETE_EXCESS_FAIL,
  DELETE_EXCESS_RESET
} from "../constants/excess.js"

export const excessReducer = (state= {allData: [], loading: false, error: '', count: 0, message:'' }, action) => {
  switch (action.type) {
    case EXCESS_REQUEST: 
      return { loading : true};

  case EXCESS_SUCCESS:
    return { loading: false, allData: action.payload, count: action.payload.count };

  case EXCESS_FAIL:
    return {loading: false, error: action.payload };

  case EXCESS_RESET:
    return { allData: [] };

  case DELETE_EXCESS_SUCCESS:
    const newData = state.allData.filter(item => item._id !== action.payload)
    return {
      loading: false, success: true, 
      allData: newData,
      message: action.payload.msg, count: state.count - 1
    };
  
  case DELETE_EXCESS_FAIL:
    return {loading: false, error: action.payload, allData: [...state.allData] };

  case DELETE_EXCESS_RESET:
    return { allData: [] };

    default:
      return state;
  }
}