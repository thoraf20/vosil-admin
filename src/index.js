import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import App from './App'

import { ContextProvider } from './contexts/ContextProvider';
import store from "./store"
import { Provider } from  "react-redux"
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns'


ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
    <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <App />
    </LocalizationProvider>
    </Provider>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);