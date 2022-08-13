import {
  WITHDRAWAL_REQUEST,
  WITHDRAWAL_SUCCESS,
  WITHDRAWAL_FAIL,
  CREATE_WITHDRAWAL_REQUEST,
  CREATE_WITHDRAWAL_SUCCESS,
  CREATE_WITHDRAWAL_FAIL,
  SINGLE_WIDTHDRAWALS_FAIL,
  SINGLE_WIDTHDRAWALS_SUCCESS,
  SINGLE_WIDTHDRAWALS_REQUEST,
  
} from "../constants/withdrawals.js"

import axios from "axios"

import { baseUrl } from "../../api/baseUrl"

export const withdrawalsData = (query, column) => async (dispatch, getState) => {
  const user = localStorage.getItem("userInfo")
  const userToken = JSON.parse(user)

  try {
    dispatch({
      type: WITHDRAWAL_REQUEST,
    })

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    }

    const { data } = await axios.get(`${baseUrl}/withdrawals?search=${query}&column=${column}`, config);
    
    dispatch({
      type: WITHDRAWAL_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: WITHDRAWAL_FAIL,
      payload: 
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const singleWithdrawalsData = (acc) => async (dispatch, getState) => {
  const user = localStorage.getItem("userInfo")
  const userToken = JSON.parse(user)

  try {
    dispatch({
      type: SINGLE_WIDTHDRAWALS_REQUEST,
    })

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    }

    const { data } = await axios.get(`${baseUrl}/withdrawal?search=${acc}`, config);
    
    dispatch({
      type: SINGLE_WIDTHDRAWALS_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: SINGLE_WIDTHDRAWALS_FAIL,
      payload: 
      error.response && error.response.data.msg
      ? error.response.data.msg
      : error.message
    })
  }
}


export const createWithdrawal = (requestData) => async (dispatch, getState) => {
  const user = localStorage.getItem("userInfo")
  const userToken = JSON.parse(user)

  try {
    dispatch({
      type: CREATE_WITHDRAWAL_REQUEST,
    })

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    }

    const { data } = await axios.post(`${baseUrl}/withdrawals/_create`, requestData, config);
    
    dispatch({
      type: CREATE_WITHDRAWAL_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: CREATE_WITHDRAWAL_FAIL,
      payload: 
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message
    })
  }
}