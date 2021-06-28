import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';

import './assets/styles/index.scss';

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<div className="loading" />}>
      <ToastContainer />
      <Router>
        <App />
      </Router>
    </Suspense>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
