import {
  CUSTOMER_REQUEST,
  CUSTOMER_SUCCESS,
  CUSTOMER_FAIL,
  CREATE_CUSTOMER_REQUEST,
  CREATE_CUSTOMER_SUCCESS,
  CREATE_CUSTOMER_FAIL,
  CUSTOMER_BY_ID_REQUEST,
  CUSTOMER_BY_ID_SUCCESS,
  CUSTOMER_BY_ID_FAIL,
  CUSTOMER_SAVINGS_REQUEST,
  CUSTOMER_SAVINGS_SUCCESS,
  CUSTOMER_SAVINGS_FAIL,
  UPDATE_CUSTOMER_REQUEST,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAIL,
  DELETE_CUSTOMER_REQUEST,
  DELETE_CUSTOMER_FAIL,
  DELETE_CUSTOMER_SUCCESS,
} from "../constants/customers.js"

import axios from "axios"

import { baseUrl } from "../../api/baseUrl"

export const customerData = (query, column) => async (dispatch, getState) => {
  const user = localStorage.getItem("userInfo")
  const userToken = JSON.parse(user)

  try {
    dispatch({
      type: CUSTOMER_REQUEST,
    })

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    }

    const { data } = await axios.get(`${baseUrl}/customers?search=${query}&column=${column}`, config);
    
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

export const customerByAccNo = async (accNo) => {
  const user = localStorage.getItem("userInfo")
  const userToken = JSON.parse(user)

  try {

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    }

    const { data } = await axios.get(`${baseUrl}/customer?search=${accNo}`, config);
   
    return data

  } catch (error) {
    console.log(error)
  }
}

export const customerById = (id) => async (dispatch, getState) => {
  const user = localStorage.getItem("userInfo")
  const userToken = JSON.parse(user)

  try {
    dispatch({
      type: CUSTOMER_BY_ID_REQUEST,
    })

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    }

    const { data } = await axios.get(`${baseUrl}/customers/${id}`, config);
    
    dispatch({
      type: CUSTOMER_BY_ID_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: CUSTOMER_BY_ID_FAIL,
      payload: 
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const customerSavings = (accNum) => async (dispatch, getState) => {
  const user = localStorage.getItem("userInfo")
  const userToken = JSON.parse(user)

  try {
    dispatch({
      type: CUSTOMER_SAVINGS_REQUEST,
    })

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    }

    const { data } = await axios.get(`${baseUrl}/customer/savings?search=${accNum}`, config);
    
    dispatch({
      type: CUSTOMER_SAVINGS_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: CUSTOMER_SAVINGS_FAIL,
      payload: 
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message
    })
  }
}

export const createCustomer = (requestData) => async (dispatch, getState) => {
  const user = localStorage.getItem("userInfo")
  const userToken = JSON.parse(user)

  try {
    dispatch({
      type: CREATE_CUSTOMER_REQUEST,
    })

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    }

    const { data } = await axios.post(`${baseUrl}/customer/_create`, requestData, config);
    
    dispatch({
      type: CREATE_CUSTOMER_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: CREATE_CUSTOMER_FAIL,
      payload: 
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.response.data.error
    })
  }
}

export const updateCustomerData = (id, requestData) => async (dispatch, getState) => {
  const user = localStorage.getItem("userInfo")
  const userToken = JSON.parse(user)

  try {
    dispatch({
      type: UPDATE_CUSTOMER_REQUEST,
    })

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    }

    const { data } = await axios.patch(`${baseUrl}/customers/${id}`, requestData, config);
    
    dispatch({
      type: UPDATE_CUSTOMER_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: UPDATE_CUSTOMER_FAIL,
      payload: 
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.response.data.error
    })
  }
}

export const deletById = (id) => async (dispatch, getState) => {
  const user = localStorage.getItem("userInfo")
  const userToken = JSON.parse(user)

  try {
    dispatch({
      type: DELETE_CUSTOMER_REQUEST,
    })

    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
    }

    const { data } = await axios.delete(`${baseUrl}/customers/${id}`, config);
    
    dispatch({
      type: DELETE_CUSTOMER_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: DELETE_CUSTOMER_FAIL,
      payload: 
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}