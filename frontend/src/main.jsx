import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.jsx';
import { Provider } from "react-redux";
import appStore from './store/index.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={appStore} >
    <App />

    </Provider>
  </React.StrictMode>,
)
