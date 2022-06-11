import {
  STAFF_REQUEST,
  STAFF_SUCCESS,
  STAFF_FAIL,
} from "../constants/staffs.js"

import axios from "axios"

import { baseUrl } from "../../api/baseUrl"

export const staffsData = () => async (dispatch, getState) => {
  const user = localStorage.getItem("userInfo")
  const userToken = JSON.parse(user)

  try {
    dispatch({
      type: STAFF_REQUEST,
    })

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    }

    const { data } = await axios.get(`${baseUrl}/staffs`, config);
    
    dispatch({
      type: STAFF_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: STAFF_FAIL,
      payload: 
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}