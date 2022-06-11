import {
  LOAN_REQUEST,
  LOAN_SUCCESS,
  LOAN_FAIL,
} from "../constants/loans.js"

import axios from "axios"

import { baseUrl } from "../../api/baseUrl"

export const loansData = () => async (dispatch, getState) => {
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

    const { data } = await axios.get(`${baseUrl}/loans`, config);
    
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
          : error.message
    })
  }
}