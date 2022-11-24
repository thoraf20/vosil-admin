import {
  SETTINGS_REQUEST,
  SETTINGS_SUCCESS,
  SETTINGS_FAIL,
  SETTINGS_RESET,
  UPDATE_SETTINGS_REQUEST,
  UPDATE_SETTINGS_SUCCESS,
  UPDATE_SETTINGS_FAIL,
  UPDATE_SETTINGS_RESET,
  ADD_SETTINGS_REQUEST,
  ADD_SETTINGS_RESET,
  ADD_SETTINGS_FAIL,
  ADD_SETTINGS_SUCCESS
} from "../constants/settings.js"

export const settingsReducer = (state= { settingData: [], loading: false, error: '', message:''  }, action) => {
  switch (action.type) {
    case SETTINGS_REQUEST: 
      return { loading : true};

  case SETTINGS_SUCCESS:
    return {loading: false, settingData: action.payload };

  case SETTINGS_FAIL:
    return {loading: false, error: action.payload };

  case SETTINGS_RESET:
    return { settingData: [] };

    case ADD_SETTINGS_REQUEST: 
    return { loading : true, ...state};

  case ADD_SETTINGS_SUCCESS:
    return {
      loading: false, success: true, 
      allData: [action.payload, ...state.settingData], 
      message: action.payload.msg
    };

  case ADD_SETTINGS_FAIL:
    return {loading: false, error: action.payload, allData: [...state.allData] };

  case ADD_SETTINGS_RESET:
    return { allData: [] };

  case UPDATE_SETTINGS_REQUEST: 
  return { loading : true};

  case UPDATE_SETTINGS_SUCCESS:
    return {
      loading: false, success: true, 
      settingData: action.payload,
      message: action.payload.msg,
    };

  case UPDATE_SETTINGS_FAIL:
    return {loading: false, error: action.payload };

  case UPDATE_SETTINGS_RESET:
      return { settingData: [] };

    default:
      return state;
  }
}

export const updateSettingsByIdReducer = (state= {settingData: [] }, action) => {
  switch (action.type) {
    case UPDATE_SETTINGS_REQUEST: 
      return { loading : true};

    case UPDATE_SETTINGS_SUCCESS:
      return {loading: false, success: true, settingData: action.payload };

    case UPDATE_SETTINGS_FAIL:
      return {loading: false, error: action.payload };

    case UPDATE_SETTINGS_RESET:
      return { settingData: [] };

    default:
      return state;
  }
}