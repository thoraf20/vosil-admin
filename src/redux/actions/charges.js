import {
  CHARGES_REQUEST,
  CHARGES_SUCCESS,
  CHARGES_FAIL,
  DELETE_CHARGES_REQUEST,
  DELETE_CHARGES_SUCCESS,
  DELETE_CHARGES_FAIL,
} from "../constants/charges"

import axios from "axios"

import { baseUrl } from "../../api/baseUrl"

export const chargesData = (query, column) => async (dispatch, getState) => {
  const user = localStorage.getItem("userInfo")
  const userToken = JSON.parse(user)

  try {
    dispatch({
      type: CHARGES_REQUEST,
    })

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    }

    const { data } = await axios.get(`${baseUrl}/charges?search=${query}&column=${column}`, config);
    
    dispatch({
      type: CHARGES_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: CHARGES_FAIL,
      payload: 
        error.response && error.response.data.message
          ? error.response.data.message
          : error.msg
    })
  }
}


export const deleteCharges= (id) => async (dispatch, getState) => {
  const user = localStorage.getItem("userInfo")
  const userToken = JSON.parse(user)

  try {
    dispatch({
      type: DELETE_CHARGES_REQUEST,
    })

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    }

    await axios.delete(`${baseUrl}/charges/${id}`, config);;
    
    dispatch({
      type: DELETE_CHARGES_SUCCESS,
      payload: id,
    })

  } catch (error) {
    dispatch({
      type: DELETE_CHARGES_FAIL,
      payload: 
      error.response && error.response.data.msg
      ? error.response.data.msg
      : error.response.data.error
    })
  }
}