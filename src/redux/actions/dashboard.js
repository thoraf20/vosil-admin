import {
  DASHBOARD_REQUEST,
  DASHBOARD_SUCCESS,
  DASHBOARD_FAIL,
  DASHBOARD_RESET
} from "../constants/dashboard.js"

import axios from "axios"

import { baseUrl } from "../../api/baseUrl"

export const dashboardData = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: DASHBOARD_REQUEST,
    })

    // const {
    //   userLogin: {userInfo},
    // } = getState();

    // console.log(getState)

    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${userInfo.token}`,
    //   },
    // }

    const { data } = await axios.get(`${baseUrl}/dashboard`);
    console.log(data)
    dispatch({
      type: DASHBOARD_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: DASHBOARD_FAIL,
      payload: 
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}