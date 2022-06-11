import {
  STAFF_REQUEST,
  STAFF_SUCCESS,
  STAFF_FAIL,
  STAFF_RESET
} from "../constants/staffs.js"

export const staffReducer = (state= {allData: [] }, action) => {
  switch (action.type) {
    case STAFF_REQUEST: 
      return { loading : true};

  case STAFF_SUCCESS:
    return {loading: false, allData: action.payload };

  case STAFF_FAIL:
    return {loading: false, error: action.payload };

  case STAFF_RESET:
    return { allData: [] };

    default:
      return state;
  }
}