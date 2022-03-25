import React from 'react';
import "antd/dist/antd.css";
import Rte from './router';
// import ManageMain from './Management/ManageMain';
import axios from "axios";
axios.defaults.baseURL="http://localhost:8200";
function App() {
  return (
    <div className="App"> 
      <Rte></Rte>
    </div>
  );
}
export default App;
 