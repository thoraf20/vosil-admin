import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import { loginReducer } from "./redux/reducers/login"
import { dashboardReducer } from "./redux/reducers/dashboard"
import { addCustomerReducer, customerByAccNoReducer, customerByIdReducer, customerReducer, customerSavingsReducer } from './redux/reducers/customers'
import { createSavingsReducer, savingsReducer, singleSavingsReducer } from './redux/reducers/savings'
import { createWithdrawalsReducer, withdrawalsReducer } from './redux/reducers/withdrawals'
import { createLoansReducer, loansReducer } from './redux/reducers/loans'
import { addStaffReducer, staffByIdReducer, staffReducer, updatePermissionByIdReducer, updateStaffByIdReducer } from './redux/reducers/staffs'
import { settingsReducer, updateSettingsByIdReducer } from './redux/reducers/settings'

const reducer = {
  loginStore: loginReducer,
  dashboard: dashboardReducer,

  customers: customerReducer,
  singleCustomer: customerByIdReducer,
  customerSavings: customerSavingsReducer,
  addCustomer: addCustomerReducer,
  customerData: customerByAccNoReducer,
  
  savings: savingsReducer,
  singleSaving: singleSavingsReducer,
  addSavings: createSavingsReducer,

  withdrawals: withdrawalsReducer,
  addWithdrawal: createWithdrawalsReducer,

  loans: loansReducer,
  addLoan: createLoansReducer,

  staffs: staffReducer,
  addStaff: addStaffReducer,
  staffById: staffByIdReducer,
  updateStaff: updateStaffByIdReducer,
  updatePermission: updatePermissionByIdReducer,

  settings: settingsReducer,
  updateSettings: updateSettingsByIdReducer,
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