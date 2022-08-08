import {
  LOAN_REQUEST,
  LOAN_SUCCESS,
  LOAN_FAIL,
  CREATE_LOAN_REQUEST,
  CREATE_LOAN_SUCCESS,
  CREATE_LOAN_FAIL,
} from "../constants/loans.js"

import axios from "axios"

import { baseUrl } from "../../api/baseUrl"

export const loansData = (query, column) => async (dispatch, getState) => {
  const user = localStorage.getItem("userInfo")
  const userToken = JSON.parse(user)

  try {
    dispatch({
      type: LOAN_REQUEST,
    })

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    }

    const { data } = await axios.get(`${baseUrl}/loans?search=${query}&column=${column}`, config);
    
    dispatch({
      type: LOAN_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: LOAN_FAIL,
      payload: 
        error.response && error.response.data.message
          ? error.response.data.message
          : error.msg
    })
  }
}


export const createLoan = (requestData) => async (dispatch, getState) => {
  const user = localStorage.getItem("userInfo")
  const userToken = JSON.parse(user)

  try {
    dispatch({
      type: CREATE_LOAN_REQUEST,
    })

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    }

    const { data } = await axios.post(`${baseUrl}/loans/_create`, requestData, config);
    
    dispatch({
      type: CREATE_LOAN_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: CREATE_LOAN_FAIL,
      payload: 
        error.response && error.response.data.message
          ? error.response.data.msg
          : error.message
    })
  }
}