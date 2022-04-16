import React from 'react';
import ReactDom from 'react-dom/client';
import './index.css';
import App from './App';
import { CssBaseline } from '@material-ui/core';

const root = ReactDom.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
);
