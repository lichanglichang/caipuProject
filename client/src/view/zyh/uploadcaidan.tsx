import React, {useState, useEffect, useRef} from "react";

import Header from "./header";
import Footer from "./footer";
import cd from "./css/uploadcaidan.module.css";
import axios from "axios";
import {useNavigate} from "react-router";
import getCookieByKey from "../getCookie";
export default function Uploadcaidan() {
  let obj = {
    width: "800px",
    height: "40px",
    border: "1px solid #E6E3DF",
    borderRadius: "3px",
    marginBottom: "20px",
  };
  let obj2 = {
    width: "800px",
    height: "40px",
    border: "1px solid #E6E3DF",
    borderRadius: "3px",
    marginBottom: "20px",
    lineHeight: "40px",
  };
  let cdmc = useRef<any>();
  let cdjs = useRef<any>();
  let cpid = useRef<any>();
  const [cpu, Setcpu] = useState<any>();
  const [iparr, Setiparr] = useState<any[]>([1, 2, 3, 4, 5]);
  let arr: any = [];
  let xxxbox: any = [];
  let cdbjfile = useRef<any>();
  let cdbj = useRef<any>();
  function zciparr() {
    return iparr.map((item: any) => {
      return (
        <div
          key={item}
          contentEditable="true"
          style={obj2}
          data-id={item}
        ></div>
      );
    });
  }
  let navigate = useNavigate();
  //增加新一栏的div标签
  function zjxx(e: any) {
    if (Number(e.target.dataset.id) === Number(iparr.length)) {
      let xz = [...iparr];
      xz.push(Number(iparr.length) + 1);
      Setiparr(xz);
      zciparr();
    }
  }
  function hqcp() {
    let divbox = cpid.current.children;
    for (let i = 0; i < divbox.length; i++) {
      if (divbox[i].innerHTML) {
        if (
          !arr.includes(
            Number(
              divbox[i].innerHTML.replace(
                "http://localhost:3000/recipedes/",
                ""
              )
            )
          )
        ) {
          arr.push(
            Number(
              divbox[i].innerHTML.replace(
                "http://localhost:3000/recipedes/",
                ""
              )
            )
          );
        }
      }
    }
    let shuju = JSON.stringify(arr);
    axios
      .get("/tianjiacaipu", {
        params: {
          id: shuju,
        },
      })
      .then(res => {
        console.log(res.data);
        for (let i = 0; i < res.data.length; i++) {
          xxxbox.push(JSON.parse(JSON.stringify(res.data[i])));
        }
        Setcpu(JSON.parse(JSON.stringify(xxxbox)));
      });
  }
  //展示选中的菜谱
  function zccpu() {
    if (cpu) {
      return cpu.map((item: any) => {
        return (
          <div key={item.id} style={{marginRight: "20px"}}>
            <div>
              <img
                src={"http://localhost:8200/" + item.img}
                alt=""
                style={{width: "200px"}}
              />
            </div>
            <div
              style={{
                width: "200px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {item.menu_name}
            </div>
          </div>
        );
      });
    }
  }
  //预览菜单背景
  function sccdbj() {
    let file = cdbjfile.current.files[0];
    if (file) {
      let caidanbj = window.URL.createObjectURL(file);
      cdbj.current.style.backgroundImage = `url(${caidanbj})`;
      console.log(caidanbj);
    }
  }
  //上传菜单
  function shangchuancaipu() {
    let menuname = cdmc.current.value.trim();
    let introduction = cdjs.current.value.trim();
    let arr = JSON.parse(JSON.stringify(cpu));
    let idbox = [];
    for (let i = 0; i < arr.length; i++) {
      idbox.push(arr[i].id);
    }
    let file = cdbjfile.current.files[0];
    let username: any = getCookieByKey("username");
    if (menuname && introduction && idbox && file && username) {
      let formData = new FormData();
      formData.append("menuname", menuname);
      formData.append("introduction", introduction);
      formData.append("recipeid", JSON.stringify(idbox));
      formData.append("uploadFile", file);
      formData.append("username", username);
      axios.post("/shangChuancaipu", formData).then(res => {
        console.log(res.data);
        if (res.data) {
          navigate("/collect");
        }
      });
    }
  }
  useEffect(() => {}, []);
  return (
    <>
      <Header></Header>
      <div style={{width: "1050px", margin: "0 auto"}}>
        <div style={{fontSize: "20px", fontWeight: "bold", margin: "20px 0"}}>
          创建菜单
        </div>
        <div>
          <input
            type="text"
            placeholder="菜单名称(必填，30字以内)"
            style={obj}
            ref={cdmc}
          />
        </div>
        <div>
          <input
            ref={cdjs}
            type="text"
            placeholder="菜单介绍(选填)"
            style={{
              width: "800px",
              height: "100px",
              border: "1px solid #E6E3DF",
              borderRadius: "3px",
              marginBottom: "20px",
            }}
          />
        </div>
        <div style={{marginBottom: "20px"}}>
          <span
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              margin: "20px 0",
              textIndent: "2em",
            }}
          >
            添加菜谱
          </span>
          <span style={{fontSize: "14px", color: "#757575"}}>
            (填入豆果美食的食谱地址或食谱ID来添加菜谱，如http://localhost:3000/recipedes/1或者1)
          </span>
        </div>
        <div style={{display: "flex", width: "800px", flexWrap: "wrap"}}>
          {zccpu()}
        </div>
        <div onClick={zjxx} ref={cpid}>
          {zciparr()}
        </div>
        <div>
          <button
            onClick={hqcp}
            style={{
              color: "white",
              backgroundColor: "#FFAF00",
              width: "80px",
              height: "35px",
              border: "none",
              borderRadius: "3px",
              marginBottom: "20px",
            }}
          >
            添加
          </button>
        </div>
        <label htmlFor="sc">
          <div
            ref={cdbj}
            style={{
              border: "1px solid #757575",
              borderRadius: "3px",
              width: "350px",
              height: "200px",
              backgroundImage:
                "url(https://i1.douguo.com//upload/banner/1543312604.jpg)",
              marginBottom: "20px",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
          >
            <input
              type="file"
              hidden
              id="sc"
              onChange={sccdbj}
              ref={cdbjfile}
            />
          </div>
        </label>
        <div>
          <button
            onClick={shangchuancaipu}
            style={{
              color: "white",
              backgroundColor: "#FFAF00",
              width: "100px",
              height: "35px",
              border: "none",
              borderRadius: "3px",
              marginBottom: "20px",
            }}
          >
            添加
          </button>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
