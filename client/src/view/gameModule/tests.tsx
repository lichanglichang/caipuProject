import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import jflogo from "../img/jflogo.jpg";
import cesijf from "./css/cesijf.module.css";
import hdzq from "../img/right.jpg";
import hdcw from "../img/wrong.jpg";
import {Link} from "react-router-dom";

export default function Cesijf() {
  const [list, SetList] = useState<any>([]);
  const [num, SetNum] = useState<number>(Math.floor(Math.random() * 12));
  // const [numbox,Setnumbox]=useState<any>([]);
  const [djzt, SetDjzt] = useState<Boolean>(false);
  const shuju = useRef<any>();
  const btn = useRef<any>();
  const cjandzy = useRef<any>();
  const qb = useRef<any>();

  useEffect(() => {
    showdata();
  }, [num, djzt]);
  function showdata() {
    axios.get("/testshow", {}).then(res => {
      SetList(res.data);
      console.log(res.data);
    });
  }
  //含量说明，是否选择正确
  function sfzq(e: any) {
    if (!djzt) {
      if (e.target.getAttribute("alt") === list[num].answer) {
        e.target.src = hdzq;
        SetDjzt(true);
        localStorage.tishu = Number(localStorage.tishu) + 1;
        localStorage.cj = Number(localStorage.cj) + 10;
        shuju.current.style.display = "flex";
        btn.current.style.backgroundColor = "#7CC331";
      } else if (e.target.getAttribute("alt") !== list[num].answer) {
        e.target.src = hdcw;
        SetDjzt(true);
        localStorage.tishu = Number(localStorage.tishu) + 1;
        shuju.current.style.display = "flex";
        btn.current.style.backgroundColor = "#7CC331";
      }
    }
  }
  //下一题
  function xyt() {
    if (djzt) {
      if (Number(localStorage.tishu) === 10) {
        localStorage.tishu = 0;
        // SetDjzt(true);
        qb.current.style.backgroundColor = "#D6D6D6";
        cjandzy.current.style.display = "block";
        return;
      }
      SetNum((prv): any => {
        return prv === 11 ? (prv = 0) : prv + 1;
      });

      SetDjzt(false);
      shuju.current.style.display = "none";
      btn.current.style.backgroundColor = "#D1D1D1";
    }
  }
  function cxcs() {
    // SetDjzt(false);
    localStorage.cj = 0;
    cjandzy.current.style.display = "none";
  }

  function jiemian(): any {
    if (list.length !== 0) {
      return (
        <>
          <div>{list[num].testname}</div>
          <div onClick={sfzq}>
            <img
              src={JSON.parse(list[num].optionA).url}
              alt={JSON.parse(list[num].optionA).name}
            />
            <img
              src={JSON.parse(list[num].optionB).url}
              alt={JSON.parse(list[num].optionB).name}
            />
            <img
              src={JSON.parse(list[num].optionC).url}
              alt={JSON.parse(list[num].optionC).name}
            />
            <img
              src={JSON.parse(list[num].optionD).url}
              alt={JSON.parse(list[num].optionD).name}
            />
          </div>
          <div>
            <div>{JSON.parse(list[num].optionA).name}</div>
            <div>{JSON.parse(list[num].optionB).name}</div>
            <div>{JSON.parse(list[num].optionC).name}</div>
            <div>{JSON.parse(list[num].optionD).name}</div>
          </div>
          <div ref={shuju} style={{display: "none"}}>
            <div>{JSON.parse(list[num].optionA).des}</div>
            <div>{JSON.parse(list[num].optionB).des}</div>
            <div>{JSON.parse(list[num].optionC).des}</div>
            <div>{JSON.parse(list[num].optionD).des}</div>
          </div>
          <div style={{alignSelf: "flex-end", color: "#999999"}}>
            <span style={{color: "#7CC331"}}>
              {localStorage.getItem("tishu")}
            </span>{" "}
            /10
          </div>
        </>
      );
    }
  }
  return (
    <div
      ref={qb}
      style={{width: "100vw", minHeight: "100vh", backgroundColor: "white"}}
    >
      <div className={cesijf.logo}>
        <Link to={{pathname: "/"}}>
          <img src={jflogo} alt="" />
        </Link>
      </div>
      <div className={cesijf.bg}>
        <div className={cesijf.tm}>{jiemian()}</div>
        <div style={{alignSelf: "flex-center", marginBottom: "40px"}}>
          <button onClick={xyt} ref={btn} className={cesijf.anniu}>
            下一题
          </button>
        </div>
        <div ref={cjandzy} className={cesijf.xx}>
          <div>
            <div>经过@有滋味美食 #减肥食材大考验#，</div>
            <div>您的成绩是{localStorage.getItem("cj")}，希望您再接再厉</div>
          </div>
          <button className={cesijf.fhsy} onClick={cxcs}>
            重新测试
          </button>
          <Link to={{pathname: "/"}}>
            <button className={cesijf.fhsy}>返回首页</button>
          </Link>
        </div>
      </div>
      <div className={cesijf.db}>©2009-2013 DouGuo.com 京ICP证111032号</div>
    </div>
  );
}
