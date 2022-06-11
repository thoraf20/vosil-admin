import {
  SAVING_REQUEST,
  SAVING_SUCCESS,
  SAVING_FAIL,
  SAVING_RESET
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