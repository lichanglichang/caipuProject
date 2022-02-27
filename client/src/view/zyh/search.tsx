import React, {useState, useEffect, useRef} from "react";
import Header from "./header";
import Footer from "./footer";
import {useParams, useNavigate} from "react-router-dom";
import {Tabs} from "antd";
import ms from "./css/search.module.css";
import axios from "axios";
import Menus from "../cxj/menus";

export default function Search() {
  let obj = useParams();
  let navigate = useNavigate();
  const [caipu, Setcaipu] = useState<any[]>([]);
  const [caidan, Setcaidan] = useState<any>();
  const [yh, Setyh] = useState<any>();
  const [sfysj, Setsfysj] = useState<any>(false);
  const [sfyyh, Setsfyyh] = useState<any>(false);
  let cesisfscys = useRef();
  useEffect(() => {
    callback(1);
  }, [sfysj, caipu, sfysj, sfyyh]);
  const {TabPane} = Tabs;

  function callback(key: any) {
    if (Number(key) === 1) {
      axios
        .get("/searChcaipu", {
          params: {
            kw: obj.kw,
          },
        })
        .then(res => {
          if (res.data.length === 0) {
            Setsfysj(true);
          } else {
            Setsfysj(false);
          }
          Setcaipu(res.data);
        });
    } else if (key === 2) {
      axios.get("/ser");
    } else if (Number(key) === 3) {
      axios
        .get("/searchUser", {
          params: {
            kw: obj.kw,
          },
        })
        .then(res => {
          if (res.data.length === 0) {
            Setsfyyh(true);
          } else {
            Setsfyyh(false);
          }
          let arrbox = [];
          let obj: any = {};
          for (let i = 0; i < res.data.length; i++) {
            if (!obj[res.data[i].username]) {
              arrbox.push(res.data[i]);
              obj[res.data[i].username] = true;
            }
          }
          Setyh(arrbox);
        });
    }
  }
  function xxcl(item: any) {
    if (caipu.length !== 0) {
      return JSON.parse(item.describ).map((i: any) => {
        return (
          <>
            {i.name}
            {i.how}
          </>
        );
      });
    }
  }
  //搜索展示菜谱
  function szcsp() {
    if (caipu.length !== 0) {
      return caipu.map((item: any) => {
        return (
          <div key={item.id} onClick={tzcp} className={ms.caipu}>
            <div>
              <img src={"http://localhost:8200" + item.img} alt={item.id} />
            </div>
            <div className={ms.caipunr}>
              <div data-id={item.id}>{item.menu_name}</div>
              <div>{xxcl(item)}</div>
              <div>{item.nickname}</div>
            </div>
          </div>
        );
      });
    }
  }
  //跳转菜谱
  function tzcp(e: any) {
    if (e.target.dataset.id) {
      navigate({pathname: `/Recipedes/${e.target.dataset.id}`});
    }
    if (e.target.alt) {
      navigate({pathname: `/Recipedes/${e.target.alt}`});
    }
  }

  //展示用户
  function zcyh() {
    if (yh) {
      if (yh.length !== 0) {
        return yh.map((item: any) => {
          return (
            <div key={item.id} style={{width: "200px", margin: "20px 20px"}}>
              <img
                src={item.url}
                alt=""
                style={{width: "80px", height: "80px"}}
              />
              <span>{item.nickname}</span>
            </div>
          );
        });
      }
    }
  }
  return (
    <>
      <Header></Header>
      <div className={ms.bx}>
        <Tabs defaultActiveKey="1" onChange={callback} id="qwer">
          <TabPane tab="菜谱" key="1">
            <div
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                margin: "20px 0",
                textIndent: "2em",
              }}
            >
              {obj.kw}的菜谱
            </div>
            <div
              style={{
                display: sfysj ? "block" : "none",
                fontSize: "20px",
                fontWeight: "bold",
                margin: "20px 0",
                textIndent: "2em",
              }}
            >
              没有相关用户的菜谱，请重新查询
            </div>
            <div>{szcsp()}</div>
          </TabPane>
          <TabPane tab="菜单" key="2">
            <Menus></Menus>
          </TabPane>
          <TabPane tab="用户" key="3">
            <div
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                margin: "20px 0",
                textIndent: "2em",
              }}
            >
              {obj.kw}的相关用户
            </div>
            <div
              style={{
                display: sfyyh ? "block" : "none",
                fontSize: "20px",
                fontWeight: "bold",
                margin: "20px 0",
                textIndent: "2em",
              }}
            >
              没有相关用户，请重新查询
            </div>
            <div style={{display: "flex", width: "800px", flexWrap: "wrap"}}>
              {zcyh()}
            </div>
          </TabPane>
        </Tabs>
      </div>
      <Footer></Footer>
    </>
  );
}
