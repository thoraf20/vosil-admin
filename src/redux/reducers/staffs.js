import {
  STAFF_REQUEST,
  STAFF_SUCCESS,
  STAFF_FAIL,
  STAFF_RESET,
  ADD_STAFF_REQUEST,
  ADD_STAFF_SUCCESS,
  ADD_STAFF_FAIL,
  ADD_STAFF_RESET,
  STAFF_BY_ID_REQUEST,
  STAFF_BY_ID_SUCCESS,
  STAFF_BY_ID_FAIL,
  STAFF_BY_ID_RESET,
  UPDATE_STAFF_FAIL,
  UPDATE_STAFF_SUCCESS,
  UPDATE_STAFF_REQUEST,
  UPDATE_STAFF_RESET,
  UPDATE_PERMISSION_REQUEST,
  UPDATE_PERMISSION_SUCCESS,
  UPDATE_PERMISSION_FAIL,
  UPDATE_PERMISSION_RESET
} from "../constants/staffs.js"

export const staffReducer = (state= {allData: [], loading: false, error: '', count: 0, message:'' }, action) => {
  switch (action.type) {
    case STAFF_REQUEST: 
      return { loading : true};

  case STAFF_SUCCESS:
    return {loading: false, allData: action.payload.staffs, count: action.payload.count };

  case STAFF_FAIL:
    return {loading: false, error: action.payload };

  case STAFF_RESET:
    return { allData: [] };

  case ADD_STAFF_REQUEST: 
    return { loading : true, ...state};

  case ADD_STAFF_SUCCESS:
    return {
      loading: false, success: true, 
      allData: [action.payload.staff, ...state.allData], 
      message: action.payload.msg, count: state.count + 1
    };

  case ADD_STAFF_FAIL:
    return {loading: false, error: action.payload };

  case ADD_STAFF_RESET:
    return { allData: [] };

    default:
      return state;
  }
}

export const staffByIdReducer = (state= {allData: [] }, action) => {
  switch (action.type) {
    case STAFF_BY_ID_REQUEST: 
      return { loading : true};

  case STAFF_BY_ID_SUCCESS:
    return {loading: false, allData: action.payload };

  case STAFF_BY_ID_FAIL:
    return {loading: false, error: action.payload };

  case STAFF_BY_ID_RESET:
    return { allData: [] };

    default:
      return state;
  }
}

export const addStaffReducer = (state= {allData: [] }, action) => {
  switch (action.type) {
    case ADD_STAFF_REQUEST: 
      return { loading : true};

  case ADD_STAFF_SUCCESS:
    return {loading: false, success: true, allData: action.payload };

  case ADD_STAFF_FAIL:
    return {loading: false, error: action.payload };

  case ADD_STAFF_RESET:
    return { allData: [] };

    default:
      return state;
  }
}

export const updateStaffByIdReducer = (state= {allData: [] }, action) => {
  switch (action.type) {
    case UPDATE_STAFF_REQUEST: 
      return { loading : true};

  case UPDATE_STAFF_SUCCESS:
    return {loading: false, success: true, allData: action.payload };

  case UPDATE_STAFF_FAIL:
    return {loading: false, error: action.payload };

  case UPDATE_STAFF_RESET:
    return { allData: [] };

    default:
      return state;
  }
}

export const updatePermissionByIdReducer = (state= {permissionData: [] }, action) => {
  switch (action.type) {
    case UPDATE_PERMISSION_REQUEST: 
      return { loading : true};

  case UPDATE_PERMISSION_SUCCESS:
    return {loading: false, success: true, permissionData: action.payload };

  case UPDATE_PERMISSION_FAIL:
    return {loading: false, error: action.payload };

  case UPDATE_PERMISSION_RESET:
    return { permissionData: [] };

    default:
      return state;
  }
}