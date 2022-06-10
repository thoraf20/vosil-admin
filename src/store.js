import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'


import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { loginReducer } from "./redux/reducers/login"
import { dashboardReducer } from "./redux/reducers/dashboard"

const reducer = {
  loginStore: loginReducer,
  dashboard: dashboardReducer
}

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage
  }
}

const middleware = [thunk]

const store = configureStore({ 
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  initialState
 })


export default store