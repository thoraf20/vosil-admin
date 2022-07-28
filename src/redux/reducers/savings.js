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

} from "../constants/savings.js"

export const savingsReducer = (state= {allData: [] }, action) => {
  switch (action.type) {
    case SAVING_REQUEST: 
      return { loading : true};

  case SAVING_SUCCESS:
    return {loading: false, allData: action.payload };

  case SAVING_FAIL:
    return {loading: false, error: action.payload };

  case SAVING_RESET:
    return { allData: [] };

    default:
      return state;
  }
}

export const singleSavingsReducer = (state= {allData: [] }, action) => {
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

export const createSavingsReducer = (state= {allData: [] }, action) => {
  switch (action.type) {
    case CREATE_SAVING_REQUEST: 
      return { loading : true};

  case CREATE_SAVING_SUCCESS:
    return {loading: false, success: true, allData: action.payload };

  case CREATE_SAVING_FAIL:
    return {loading: false, error: action.payload };

  case CREATE_SAVING_RESET:
    return { allData: [] };

    default:
      return state;
  }
}