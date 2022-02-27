import React, {useEffect, useState} from "react";
import "./css/menucontainer.css";
import {Tabs} from "antd";
import axios from "axios";
import Header from "../zyh/header";
import Footer from "../zyh/footer";
import Menus from "./menus";
import {useNavigate} from "react-router-dom";
import {StarOutlined, EyeFilled} from "@ant-design/icons";

function Menu() {
  let navigate = useNavigate();
  const [list, setlist] = useState<any>(null);
  const {TabPane} = Tabs;
  useEffect(show, []);
  const repicedes = (num: number) => {
    navigate({pathname: `/recipedes/${num}`});
  };
  function callback(key: string) {}
  // 发起请求
  function show() {
    axios.post("http://localhost:8200/showmenu", {}).then(function (r: any) {
      setlist(r.data.data);
      console.log(r.data.data);
    });
    // function xxxx(){

    // }
  }

  function shows() {
    if (list != null) {
      // 数组循环遍历
      return list.map(function (showsany: any) {
        return (
          <div
            key={showsany.id}
            className="cshow1small"
            onClick={repicedes.bind(null, showsany.id)}
          >
            <div className="cshows1mall_img">
              <img src={"http://localhost:8200" + showsany.img} alt="" />
            </div>
            <p className="cmuenname">{showsany.menu_name}</p>
            <div className="cself">
              <div className="cself1">
                <span className="selfhead">
                  <img src={"http://localhost:8200" + showsany.img} alt="" />
                </span>
                <span className="selfname">{showsany.nickname}</span>
              </div>

              <div className="cself1">
                {/* <span className="clook">
                                    <EyeFilled /> 6588
                                    </span> */}
                <span className="clike">
                  <StarOutlined /> 145
                </span>
              </div>
            </div>
          </div>
        );
      });
    }
  }
  return (
    <>
      <Header></Header>
      <div className="ccontainer">
        <Tabs defaultActiveKey="1" onChange={callback}>
          菜谱部分
          <TabPane tab="菜谱" key="1">
            <div className="showmenu">
              <h3 className="ctitle">精选推荐菜谱</h3>
              <div className="cshow1">
                {shows()}
                <div className="zhanshi"></div>
                <div className="zhanshi"></div>
              </div>
            </div>
          </TabPane>
          菜单部分
          <TabPane tab="菜单" key="2">
            <div className="cshowmenu">
              <Menus />
            </div>
          </TabPane>
        </Tabs>
      </div>
      <Footer />
    </>
  );
}
export default Menu;
