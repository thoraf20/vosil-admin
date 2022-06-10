import {
  DASHBOARD_REQUEST,
  DASHBOARD_SUCCESS,
  DASHBOARD_FAIL,
  DASHBOARD_RESET
} from "../constants/dashboard.js"

export const dashboardReducer = (state= {allData: [] }, action) => {
  switch (action.type) {
    case DASHBOARD_REQUEST: 
      return { loading : true};

  case DASHBOARD_SUCCESS:
    return {loading: false, allData: action.payload };

  case DASHBOARD_FAIL:
    return {loading: false, error: action.payload };

  case DASHBOARD_RESET:
    return { allData: [] };

    default:
      return state;
  }
}