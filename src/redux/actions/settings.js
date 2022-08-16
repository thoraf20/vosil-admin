import {
  SETTINGS_REQUEST,
  SETTINGS_SUCCESS,
  SETTINGS_FAIL,
  UPDATE_SETTINGS_REQUEST,
  UPDATE_SETTINGS_SUCCESS,
  UPDATE_SETTINGS_FAIL,
} from "../constants/settings.js"

import axios from "axios"

import { baseUrl } from "../../api/baseUrl"

export const settingsData = () => async (dispatch, getState) => {
  const user = localStorage.getItem("userInfo")
  const userToken = JSON.parse(user)

  try {
    dispatch({
      type: SETTINGS_REQUEST,
    })

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    }

    const { data } = await axios.get(`${baseUrl}/settings`, config);
    dispatch({
      type: SETTINGS_SUCCESS,
      payload: data[0],
    })

  } catch (error) {
    dispatch({
      type: SETTINGS_FAIL,
      payload: 
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const updateSettingsData = (id, requestData) => async (dispatch, getState) => {
  const user = localStorage.getItem("userInfo")
  const userToken = JSON.parse(user)

  try {
    dispatch({
      type: UPDATE_SETTINGS_REQUEST,
    })

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    }

    const { data } = await axios.patch(`${baseUrl}/settings/${id}`, requestData, config);
    
    dispatch({
      type: UPDATE_SETTINGS_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: UPDATE_SETTINGS_FAIL,
      payload: 
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message
    })
  }
}