import {
  CUSTOMER_REQUEST,
  CUSTOMER_SUCCESS,
  CUSTOMER_FAIL,
  CUSTOMER_RESET,
  CREATE_CUSTOMER_REQUEST,
  CREATE_CUSTOMER_SUCCESS,
  CREATE_CUSTOMER_FAIL,
  CREATE_CUSTOMER_RESET,
  CUSTOMER_BY_ID_REQUEST,
  CUSTOMER_BY_ID_FAIL,
  CUSTOMER_BY_ID_SUCCESS,
  CUSTOMER_BY_ID_RESET,
  CUSTOMER_SAVINGS_REQUEST,
  CUSTOMER_SAVINGS_SUCCESS,
  CUSTOMER_SAVINGS_RESET,
  CUSTOMER_SAVINGS_FAIL,
  UPDATE_CUSTOMER_RESET,
  UPDATE_CUSTOMER_FAIL,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_REQUEST
} from "../constants/customers.js"
import { CUSTOMER_WIDTHDRAWALS_FAIL, CUSTOMER_WIDTHDRAWALS_REQUEST, CUSTOMER_WIDTHDRAWALS_RESET, CUSTOMER_WIDTHDRAWALS_SUCCESS } from "../constants/withdrawals.js";

export const customerReducer = (state= {allData: [] }, action) => {
  switch (action.type) {
    case CUSTOMER_REQUEST: 
      return { loading : true};

  case CUSTOMER_SUCCESS:
    return {loading: false, allData: action.payload };

  case CUSTOMER_FAIL:
    return {loading: false, error: action.payload };

  case CUSTOMER_RESET:
    return { allData: [] };

    default:
      return state;
  }
}

export const customerByIdReducer = (state= {allData: [] }, action) => {
  switch (action.type) {
    case CUSTOMER_BY_ID_REQUEST: 
      return { loading : true};

  case CUSTOMER_BY_ID_SUCCESS:
    return {loading: false, allData: action.payload };

  case CUSTOMER_BY_ID_FAIL:
    return {loading: false, error: action.payload };

  case CUSTOMER_BY_ID_RESET:
    return { allData: [] };

    default:
      return state;
  }
}

export const customerSavingsReducer = (state= {savingsData: [] }, action) => {
  switch (action.type) {
    case CUSTOMER_SAVINGS_REQUEST: 
      return { loading : true, success: false};

  case CUSTOMER_SAVINGS_SUCCESS:
    return {loading: false, success: true, savingsData: action.payload };

  case CUSTOMER_SAVINGS_FAIL:
    return {loading: false, error: action.payload };

  case CUSTOMER_SAVINGS_RESET:
    return { savingsData: [] };

    default:
      return state;
  }
}

export const customerWithdrawalsReducer = (state= {withdrawalsData: [] }, action) => {
  switch (action.type) {
    case CUSTOMER_WIDTHDRAWALS_REQUEST: 
      return { loading : true, success: false};

  case CUSTOMER_WIDTHDRAWALS_SUCCESS:
    return {loading: false, success: true, withdrawalsData: action.payload };

  case CUSTOMER_WIDTHDRAWALS_FAIL:
    return {loading: false, error: action.payload };

  case CUSTOMER_WIDTHDRAWALS_RESET:
    return { withdrawalsData: [] };

    default:
      return state;
  }
}
export const addCustomerReducer = (state= {allData: [] }, action) => {
  switch (action.type) {
    case CREATE_CUSTOMER_REQUEST: 
      return { loading : true};

  case CREATE_CUSTOMER_SUCCESS:
    return {loading: false, success: true, allData: action.payload };

  case CREATE_CUSTOMER_FAIL:
    return {loading: false, error: action.payload };

  case CREATE_CUSTOMER_RESET:
    return { allData: [] };

    default:
      return state;
  }
}

export const updateCustomerByIdReducer = (state= {updateDate: [] }, action) => {
  switch (action.type) {
    case UPDATE_CUSTOMER_REQUEST: 
      return { loading : true};

    case UPDATE_CUSTOMER_SUCCESS:
      return {loading: false, success: true, updateDate: action.payload };

    case UPDATE_CUSTOMER_FAIL:
      return {loading: false, error: action.payload };

    case UPDATE_CUSTOMER_RESET:
      return { updateDate: [] };

    default:
      return state;
  }
}

export const deleteCustomerByIdReducer = (state= {updateDate: [] }, action) => {
  switch (action.type) {
    case UPDATE_CUSTOMER_REQUEST: 
      return { loading : true};

    case UPDATE_CUSTOMER_SUCCESS:
      return {loading: false, success: true, updateDate: action.payload };

    case UPDATE_CUSTOMER_FAIL:
      return {loading: false, error: action.payload };

    case UPDATE_CUSTOMER_RESET:
      return { updateDate: [] };

    default:
      return state;
  }
}