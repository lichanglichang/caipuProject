import React from "react";
import { useNavigate } from "react-router-dom";
import getCookieByKey from "../../view/getCookie";



const PrivateRoute = (props:React.ReactDOM) => {
  const navigate = useNavigate();

  console.log(props,"props");
  

  // 进入界面时，判断是否为登陆转态
  if (getCookieByKey("msg") === null) {
    navigate({ pathname: "/Login" });
    return props;
  } else {
    return props;
  }
};

export default PrivateRoute;
