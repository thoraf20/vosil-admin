import {
  STAFF_REQUEST,
  STAFF_SUCCESS,
  STAFF_FAIL,
  STAFF_BY_ID_REQUEST,
  STAFF_BY_ID_SUCCESS,
  STAFF_BY_ID_FAIL,
  UPDATE_STAFF_FAIL,
  UPDATE_STAFF_SUCCESS,
  UPDATE_STAFF_REQUEST,
  UPDATE_PERMISSION_REQUEST,
  UPDATE_PERMISSION_SUCCESS,
  UPDATE_PERMISSION_FAIL,
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

export const staffsByIdData = (id) => async (dispatch, getState) => {
  const user = localStorage.getItem("userInfo")
  const userToken = JSON.parse(user)

  try {
    dispatch({
      type: STAFF_BY_ID_REQUEST,
    })

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    }

    const { data } = await axios.get(`${baseUrl}/staffs/${id}`, config);
    
    dispatch({
      type: STAFF_BY_ID_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: STAFF_BY_ID_FAIL,
      payload: 
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const addStaffData = (requestData) => async (dispatch, getState) => {
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

    const { data } = await axios.post(`${baseUrl}/_create_staff`, requestData, config);
    
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

export const updateStaffData = (id, requestData) => async (dispatch, getState) => {
  const user = localStorage.getItem("userInfo")
  const userToken = JSON.parse(user)

  try {
    dispatch({
      type: UPDATE_STAFF_REQUEST,
    })

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    }

    const { data } = await axios.patch(`${baseUrl}/staffs/${id}`, requestData, config);
    
    dispatch({
      type: UPDATE_STAFF_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: UPDATE_STAFF_FAIL,
      payload: 
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const updatePermissionData = (id, requestData) => async (dispatch, getState) => {
  const user = localStorage.getItem("userInfo")
  const userToken = JSON.parse(user)

  try {
    dispatch({
      type: UPDATE_PERMISSION_REQUEST,
    })

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    }

    const { data } = await axios.patch(`${baseUrl}/staffs/${id}/permissions`, requestData, config);
    
    dispatch({
      type: UPDATE_PERMISSION_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: UPDATE_PERMISSION_FAIL,
      payload: 
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}