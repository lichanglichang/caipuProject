import React, { useState, useEffect } from "react";
import { Comment, Tooltip, List, Avatar, Form, Button, Input } from "antd";
import moment from "moment";
import GetC from "./GetC";
import axios from "axios";
import ThemeContext from "./MyContext";
import Show from "./Show";
import Item from "antd/lib/list/Item";
import "./Cominput.css"
const Cominput= (params:any) => {
    console.log(params,"params的值");
    
  const [comment, setComment] = useState<string>("");
  const [comments1, setComments1] = useState<any>(null);
  const [comments2, setComments2] = useState<any>(null);
  const [comments3, setComments3] = useState<any>(null);
  const [name1, setName1] = useState<any>(null);
  const [name2, setName2] = useState<any>(null);
  const [name3, setName3] = useState<any>(null);
  const cookie0 = document.cookie.split(";");
  const cookie1 = GetC(cookie0);
  console.log(cookie1);
  
  const [url1, setUrl1] = useState<any>(null);
  const [url2, setUrl2] = useState<any>(null);
  const [url3, setUrl3] = useState<any>(null);
  const [data,setData] = useState<any>([])

  //发送评论
  function SendCom() {
    axios
      .get("http://localhost:8200/getComment", {
        params: {
          comment: comment,
          username: cookie1,
          ...params.params
        },
      })
      .then(function (res: any) {
        if (res.data.code == 3) {
          alert("请登录！");
        }
        axios
        .get("showCom",{params:{...params.params}})
        .then(function (res: any) {
            setData(res.data)
        })
      })
      .catch(function (error: any) {
        console.log(error);
      });
  }

  //查询评论
  function ShowCom() {
    axios
      .get("showCom",{params:{...params.params}})
      .then(function (res: any) {
          setData(res.data)
      })
      .catch(function (error: any) {
        console.log(error);
      });
  }

  useEffect(ShowCom, []);

  return (
    <ThemeContext.Provider
      value={{
        comments1,
        comments2,
        comments3,
        name1,
        name2,
        name3,
        url1,
        url2,
        url3,
        cookie1,
      }}
    >
      <div className="comm" style={{marginTop:"20px"}}>
        <textarea
          className="comm-txt"
          value={comment}
          onChange={function (e: any) {
            setComment(e.target.value);
          }}
        ></textarea>
        <div>
          <button className="comm-btn" onClick={SendCom}>
            发表评论
          </button>
        </div>
      </div>
      <br />
      <br />
      {/* <Show /> */}
      {data.map((item:any)=>{
          return <div className="item">
             
              <img src={item.url} alt="" className="itemImg"/>
              <span>{item.nickname}</span>
              <p className="itemContent"> {item?.comments}</p>
             </div>
      })}
    </ThemeContext.Provider>
  );
};

export default Cominput;
