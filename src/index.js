import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import reduxStore from './redux/reduxStore';
import "./styles/global.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={reduxStore}>
    <App />
  </Provider>
);
