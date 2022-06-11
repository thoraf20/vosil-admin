import {
  SAVING_REQUEST,
  SAVING_SUCCESS,
  SAVING_FAIL,
} from "../constants/savings.js"

import axios from "axios"

import { baseUrl } from "../../api/baseUrl"

export const savingsData = () => async (dispatch, getState) => {
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

    const { data } = await axios.get(`${baseUrl}/savings`, config);
    
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