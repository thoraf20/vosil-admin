import {
  SAVING_REQUEST,
  SAVING_SUCCESS,
  SAVING_FAIL,
  SINGLE_SAVING_REQUEST,
  SINGLE_SAVING_SUCCESS,
  SINGLE_SAVING_FAIL,
  CREATE_SAVING_REQUEST,
  CREATE_SAVING_SUCCESS,
  CREATE_SAVING_FAIL,
} from "../constants/savings.js"

import axios from "axios"

import { baseUrl } from "../../api/baseUrl"

export const savingsData = (query, column) => async (dispatch, getState) => {
  const user = localStorage.getItem("userInfo")
  const userToken = JSON.parse(user)

  try {
    dispatch({
      type: SAVING_REQUEST,
    })

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    }

    const { data } = await axios.get(`${baseUrl}/savings?search=${query}&column=${column}`, config);
    
    dispatch({
      type: SAVING_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: SAVING_FAIL,
      payload: 
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const singleSavingsData = () => async (dispatch, getState) => {
  const user = localStorage.getItem("userInfo")
  const userToken = JSON.parse(user)

  try {
    dispatch({
      type: SINGLE_SAVING_REQUEST,
    })

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    }

    const { data } = await axios.get(`${baseUrl}/savings`, config);
    
    dispatch({
      type: SINGLE_SAVING_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: SINGLE_SAVING_FAIL,
      payload: 
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const createSavings = (requestData) => async (dispatch, getState) => {
  const user = localStorage.getItem("userInfo")
  const userToken = JSON.parse(user)

  try {
    dispatch({
      type: CREATE_SAVING_REQUEST,
    })

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    }

    const { data } = await axios.post(`${baseUrl}/savings/_create`, requestData, config);
    
    dispatch({
      type: CREATE_SAVING_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: CREATE_SAVING_FAIL,
      payload: 
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message
    })
  }
}