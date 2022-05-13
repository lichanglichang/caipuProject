import React, {useState, useEffect, useRef} from "react";
import "./css/releaseRecipe.css";
import "antd/dist/antd.css";
import Header from "../components/header";
import Footer from "../components/footer";

import {
  PlusOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import getCookieByKey from "../getCookie";
import axios from "axios";
import Show from "../zjy/Show";


function Releaser() {
  const [num1, setNum1] = useState<number[]>([0, 0, 0, 0]);
  const [num2, setNum2] = useState<number[]>([0]);
  const [imgURL1, setimgURL1] = useState<any>();
  const submitImg1 = useRef<any>();
  const [imgURL2, setimgURL2] = useState<any>();
  const submitImg2 = useRef<any>();
  let recipename = useRef<any>();
  let recipedes = useRef<any>();
  let allbox = useRef<any>();
  let bztp = useRef<any>();
  // const [filebox,Setfilebox]=useState<any>();
  function shangchuancaipu() {
    let menu_name = recipename.current.value.trim();
    let introduce = recipedes.current.value.trim();
    let formData = new FormData();

    formData.append("menu_name", menu_name);
    formData.append("introduce", introduce);
  }

  function uploadimg1() {
    let caddimg1: any = document.querySelector(".caddimg");
    let cimgURL1: any = document.querySelector(".cimgURL");
    caddimg1.style.display = "none";
    cimgURL1.style.display = "block";
    let file1 = submitImg1.current.files[0];
    let touX1 = window.URL.createObjectURL(file1);
    setimgURL1(touX1);
  }

  function uploadimg2(e: any) {
    let file = e.target.files[0];

    let touX = window.URL.createObjectURL(file);

    e.target.parentElement.style.backgroundImage = `url(${touX})`;
    let formData = new FormData();
    formData.append("uploadFile", file);
    if (file) {
      // console.log(formData);
      // console.log(file);

      axios.post("/uploadfiles", formData).then(function (r: any) {
        // console.log(r.data);
        e.target.parentElement.dataset.url = r.data;
      });
    }
  }

  function add1() {
    let newnum1: number[] = num1;
    newnum1.push(0);
    setNum1([...newnum1]);
    // console.log(num1);
  }
  function deletes1() {
    let newnum1: number[] = num1;
    newnum1.pop();
    setNum1([...newnum1]);
  }

  function add2() {
    let newnum2: number[] = num2;
    newnum2.push(0);
    setNum2([...newnum2]);
    // console.log(submitImg2);
  }
  function deletes2() {
    let newnum2: number[] = num2;
    newnum2.pop();
    setNum2([...newnum2]);
  }
  // 食材
  function show1() {
    return num1.map(function (v, i) {
      return (
        <div key={i} className="cinput">
          <div className="cinput_l" contentEditable="true"></div>
          <div className="cinput_r" contentEditable="true"></div>
          <div className="cbtn">
            <div className="cxjadd" onClick={add1}>
              <PlusOutlined />
            </div>
            <div className="cxjtop">
              <ArrowUpOutlined />
            </div>
            <div className="cxjbittom">
              <ArrowDownOutlined />
            </div>
            <div className="cxjjian" onClick={deletes1}>
              <MinusOutlined />
            </div>
          </div>
        </div>
      );
    });
  }
  // 步骤
  function show2() {
    return num2.map(function (a, i) {
      return (
        <div className="cstepdes" key={i}>
          <label htmlFor={"i" + i}>
            <div
              className="cstepdes_img"
              data-url=""
              style={{
                backgroundImage:
                  "url(https://cp1.douguo.com/static/nweb/images/add.png)",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <input
                type="file"
                id={"i" + i}
                hidden
                className="csubmit2"
                data-id={i}
                ref={submitImg2}
              />
            </div>
          </label>
          <div className="csteptext" contentEditable="true"></div>
          <div
            contentEditable="true"
            style={{width: "500px", height: "100px"}}
            className="cmenudetail"
          ></div>
          <div className="cstepbtn">
            <div onClick={add2}>
              <PlusOutlined />
            </div>
            <div>
              <ArrowUpOutlined />
            </div>
            <div>
              <ArrowDownOutlined />
            </div>
            <div onClick={deletes2}>
              <MinusOutlined />
            </div>
          </div>
        </div>
      );
    });
  }
  // 点击发布
  function clickRelease() {
    let img = submitImg1.current.files[0];
    let menu_name = recipename.current.value.trim();
    let introduce = recipedes.current.value;
    let nickname: any = getCookieByKey("nickname");
    let arr = [];
    for (let i = 0; i < allbox.current.children.length; i++) {
      if (
        allbox.current.children[i].children[0].innerHTML &&
        allbox.current.children[i].children[1].innerHTML
      ) {
        let obj = {name: "", how: ""};
        obj.name = allbox.current.children[i].children[0].innerHTML;
        obj.how = allbox.current.children[i].children[1].innerHTML;
        arr.push(obj);
      }
    }
    let bzbox: any = [];
    for (let i = 0; i < bztp.current.children.length; i++) {
      let obj = {step: "", des: "", url: ""};
      obj.step = bztp.current.children[i].children[1].innerHTML;
      obj.url = bztp.current.children[i].children[0].children[0].dataset.url;
      obj.des = bztp.current.children[i].children[2].innerHTML;
      bzbox.push(obj);
    }
    let formData = new FormData();
    formData.append("menu_name", menu_name);
    formData.append("introduce", introduce);
    formData.append("describe", JSON.stringify(arr));
    formData.append("steps", JSON.stringify(bzbox));
    formData.append("img", img);
    formData.append("nickname", nickname);
    // console.log(menu_name);
    // console.log(introduce);
    // console.log(JSON.stringify(arr));
    // console.log(JSON.stringify(bzbox));
    // console.log(img);
    // console.log(nickname);

    axios
      .post("/uploadCaipu", formData)
      .then(res => {
        // console.log(res.data);
      })
      .then(function (r: any) {
        alert("发布成功");
        window.location.reload();
      });
  }

  return (
    <>
      <Header />
      <div className="creleaser">
        <div style={{fontSize: "20px", fontWeight: "bold", margin: "20px 0"}}>发布菜谱</div>
        <div className="cmreleaser">
          <div className="creleaser_img">
            <input
              type="file"
              className="csubmit1"
              ref={submitImg1}
              onChange={uploadimg1}
            />
            <div className="caddimg">
              <div className="cadd">
                <PlusOutlined />
              </div>
              <div className="caddtext">
                <p>添加菜谱成品图</p>
                <p>
                  （建议尺寸1280*1024，支持上传图片格式有jpg、jpeg、png、gif、webp）
                </p>
              </div>
            </div>
            <img src={imgURL1} alt="" className="cimgURL" />
          </div>
          <div className="crecipename ">
            <input type="text" placeholder="请输入菜谱名称" ref={recipename} />
          </div>

          <div className="cintroduce">
            <input
              className="cstrtext"
              ref={recipedes}
              placeholder="菜品详情"
              type="text"
            />
          </div>
          <div className="cline"></div>
          <div className="caddingredient">
            <p>食材清单</p>
            <div className="cadding">
              <div className="ctype">
                <div className="cfood">食材</div>
                <div className="chow">用量</div>
                <div></div>
              </div>
              {/* 食材用料输入框 */}
              <div ref={allbox}>{show1()}</div>
            </div>
            <div className="caddone caddingone" onClick={add1}>
              增加一栏
            </div>
          </div>
          <div className="cline"></div>

          <div className="cddstep">
            <p>步骤</p>
            <span className="csurport">
              （支持上传图片格式有jpg、jpeg、png、gif、webp）
            </span>
            <div onChange={uploadimg2} ref={bztp}>
              {show2()}
            </div>
            <div className="caddone caddstepone" onClick={add2}>
              增加一栏
            </div>
          </div>
        </div>
        <div className="cline"></div>
        <button className="cbtnupload" onClick={clickRelease}>
          发布
        </button>
      </div>

      <Footer />
    </>
  );
}
export default Releaser;
