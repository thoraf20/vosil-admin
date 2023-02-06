import {
  EXCESS_REQUEST,
  EXCESS_SUCCESS,
  EXCESS_FAIL,
  DELETE_EXCESS_REQUEST,
  DELETE_EXCESS_SUCCESS,
  DELETE_EXCESS_FAIL,
} from "../constants/excess.js"

import axios from "axios"

import { baseUrl } from "../../api/baseUrl"

export const excessData = (query, column) => async (dispatch, getState) => {
  const user = localStorage.getItem("userInfo")
  const userToken = JSON.parse(user)

  try {
    dispatch({
      type: EXCESS_REQUEST,
    })

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    }

    const { data } = await axios.get(`${baseUrl}/excess?search=${query}&column=${column}`, config);
    
    dispatch({
      type: EXCESS_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: EXCESS_FAIL,
      payload: 
        error.response && error.response.data.message
          ? error.response.data.message
          : error.msg
    })
  }
}


export const deleteExcess = (id) => async (dispatch, getState) => {
  const user = localStorage.getItem("userInfo")
  const userToken = JSON.parse(user)

  try {
    dispatch({
      type: DELETE_EXCESS_REQUEST,
    })

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    }

    const { data } = await axios.delete(`${baseUrl}/excess/${id}`, config);;
    
    dispatch({
      type: DELETE_EXCESS_SUCCESS,
      payload: id,
    })

  } catch (error) {
    dispatch({
      type: DELETE_EXCESS_FAIL,
      payload: 
      error.response && error.response.data.msg
      ? error.response.data.msg
      : error.response.data.error
    })
  }
}