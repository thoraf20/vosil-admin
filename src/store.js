import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import { loginReducer } from "./redux/reducers/login"
import { dashboardReducer } from "./redux/reducers/dashboard"
import { customerReducer } from './redux/reducers/customers'
import { savingsReducer } from './redux/reducers/savings'
import { withdrawalsReducer } from './redux/reducers/withdrawals'
import { loansReducer } from './redux/reducers/loans'
import { staffReducer } from './redux/reducers/staffs'

const reducer = {
  loginStore: loginReducer,
  dashboard: dashboardReducer,
  customers: customerReducer,
  savings: savingsReducer,
  withdrawals: withdrawalsReducer,
  loans: loansReducer,
  staffs: staffReducer
}

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage
  }
}

const store = configureStore({ 
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  initialState,
  devTools: process.env.NODE_ENV !== 'production',
 })


export default store