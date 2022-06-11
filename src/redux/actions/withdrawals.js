import {
  WITHDRAWAL_REQUEST,
  WITHDRAWAL_SUCCESS,
  WITHDRAWAL_FAIL,
} from "../constants/withdrawals.js"

import axios from "axios"

import { baseUrl } from "../../api/baseUrl"

export const withdrawalsData = () => async (dispatch, getState) => {
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

    const { data } = await axios.get(`${baseUrl}/withdrawals`, config);
    
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