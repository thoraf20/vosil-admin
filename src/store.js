import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import { loginReducer } from "./redux/reducers/login"
import { dashboardReducer } from "./redux/reducers/dashboard"
import { addCustomerReducer, customerByIdReducer, customerReducer, customerSavingsReducer, customerWithdrawalsReducer } from './redux/reducers/customers'
import { savingChargesReducer, savingsReducer, singleSavingsReducer } from './redux/reducers/savings'
import { singleWithdrawalsReducer, withdrawalsReducer } from './redux/reducers/withdrawals'
import { loansReducer } from './redux/reducers/loans'
import { staffByIdReducer, staffReducer, updatePermissionByIdReducer, updateStaffByIdReducer } from './redux/reducers/staffs'
import { settingsReducer, updateSettingsByIdReducer } from './redux/reducers/settings'
import { excessReducer } from './redux/reducers/excess'
import { chargesReducer } from './redux/reducers/charges'

const reducer = {
  loginStore: loginReducer,
  dashboard: dashboardReducer,

  customers: customerReducer,
  singleCustomer: customerByIdReducer,
  customerSavings: customerSavingsReducer,
  customerWithdrawals: customerWithdrawalsReducer,
  addCustomer: addCustomerReducer,
  // updateCustomer: updateCustomerByIdReducer,
  
  savings: savingsReducer,
  singleSaving: singleSavingsReducer,
  savingCharge: savingChargesReducer,

  withdrawals: withdrawalsReducer,
  // addWithdrawal: createWithdrawalsReducer,
  singleWithdrawal: singleWithdrawalsReducer,

  loans: loansReducer,

  excess: excessReducer,

  charges: chargesReducer,

  staffs: staffReducer,
  // addStaff: addStaffReducer,
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