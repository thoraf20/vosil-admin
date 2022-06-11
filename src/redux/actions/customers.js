import {
  CUSTOMER_REQUEST,
  CUSTOMER_SUCCESS,
  CUSTOMER_FAIL,
} from "../constants/customers.js"

import axios from "axios"

import { baseUrl } from "../../api/baseUrl"

export const customerData = () => async (dispatch, getState) => {
  const user = localStorage.getItem("userInfo")
  const userToken = JSON.parse(user)

  try {
    dispatch({
      type: CUSTOMER_REQUEST,
    })

    // const {
    //   userLogin: {userInfo},
    // } = getState();

   

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    }

    const { data } = await axios.get(`${baseUrl}/customers`, config);
    
    dispatch({
      type: CUSTOMER_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: CUSTOMER_FAIL,
      payload: 
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}