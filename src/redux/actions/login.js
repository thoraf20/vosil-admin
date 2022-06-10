import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_RESET,
  LOGOUT
} from "../constants/login.js"


import axios from "axios"

import { baseUrl } from "../../api/baseUrl"

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    })
    const config = {
      headers: {
        "Content-type" : "application/json"
      },
    }

    const { data } = await axios.post(`${baseUrl}/login`, { email, password }, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    })
    localStorage.setItem("userInfo", JSON.stringify(data))

  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: 
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo")
  dispatch({type: LOGOUT})
  dispatch({type: LOGIN_RESET})
}