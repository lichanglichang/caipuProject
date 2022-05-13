import "antd/dist/antd.css";
import axios from "axios";
import {useRoutes } from "react-router-dom";
import routes from "./route/manager-routes";
axios.defaults.baseURL = "http://localhost:8200";
function App() {
  return useRoutes(routes);
}
export default App;
