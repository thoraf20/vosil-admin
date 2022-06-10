import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import App from './App'

import { ContextProvider } from './contexts/ContextProvider';
import store from "./store"
import { Provider } from  "react-redux"


ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);