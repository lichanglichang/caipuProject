import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router} from "react-router-dom";
import Rte from './route/router';
ReactDOM.render(
  <React.StrictMode>
    <Router>
    <App />
    <Rte></Rte>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
//项目完成时可以把React.StrictMode。JS严格模式关掉，为了兼容
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
