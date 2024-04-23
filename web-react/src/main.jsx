import React from 'react'
import ReactDOM from 'react-dom/client'

import "perfect-scrollbar/css/perfect-scrollbar.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/scss/paper-dashboard.scss?v=1.3.0";

import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

// import { GoogleOAuthProvider } from '@react-oauth/google';
// const clientId = "951311377160-rqh5urnkrq2tps6ldc6gm7uhnhosp2lh.apps.googleusercontent.com"
// const clientSecret = "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";

import App from './App.jsx'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <React.StrictMode>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </React.StrictMode>
    </PersistGate>
  </Provider>
)
