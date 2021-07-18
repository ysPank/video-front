import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import App from './App';
import store from './redux/store';
import routerHistory from './helpers/history';

import 'react-toastify/dist/ReactToastify.css';
import './assets/styles/index.scss';

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<div className="loading" />}>
      <ToastContainer />
      <Router history={routerHistory}>
        <App />
      </Router>
    </Suspense>
  </Provider>,
  document.getElementById('root')
);
