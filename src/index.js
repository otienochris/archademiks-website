import React from 'react';
import ReactDom from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './state/store';

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
