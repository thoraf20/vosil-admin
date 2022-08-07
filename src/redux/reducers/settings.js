import {
  SETTINGS_REQUEST,
  SETTINGS_SUCCESS,
  SETTINGS_FAIL,
  SETTINGS_RESET,
  UPDATE_SETTINGS_REQUEST,
  UPDATE_SETTINGS_SUCCESS,
  UPDATE_SETTINGS_FAIL,
  UPDATE_SETTINGS_RESET
} from "../constants/settings.js"

export const settingsReducer = (state= {settingData: [] }, action) => {
  switch (action.type) {
    case SETTINGS_REQUEST: 
      return { loading : true};

  case SETTINGS_SUCCESS:
    return {loading: false, settingData: action.payload };

  case SETTINGS_FAIL:
    return {loading: false, error: action.payload };

  case SETTINGS_RESET:
    return { settingData: [] };

    default:
      return state;
  }
}

export const updateSettingsByIdReducer = (state= {updateDate: [] }, action) => {
  switch (action.type) {
    case UPDATE_SETTINGS_REQUEST: 
      return { loading : true};

    case UPDATE_SETTINGS_SUCCESS:
      return {loading: false, success: true, updateDate: action.payload };

    case UPDATE_SETTINGS_FAIL:
      return {loading: false, error: action.payload };

    case UPDATE_SETTINGS_RESET:
      return { updateDate: [] };

    default:
      return state;
  }
}