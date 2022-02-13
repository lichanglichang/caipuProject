import React, { useState, useRef, useEffect } from "react";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import "./login.css";
import qqImg from "../LCimg/qq.png";
import wbImg from "../LCimg/weibo.png";
import wxImg from "../LCimg/wx.png";
import Img1 from "../LCimg/logo_lo.png"
import Img2 from "../LCimg/sinin.png";

function LoginDome() {
    const regist = useRef<any>();
    const login = useRef<any>();
    const loginhead = useRef<any>();
    const registhead = useRef<any>();
    const loginspan = useRef<any>();
    const registspan = useRef<any>();
    const isSelect1 = useRef<any>();
    const isSelect2 = useRef<any>();
    const xieyi1 = useRef<any>();
    const xieyi2 = useRef<any>();
    const user = useRef<any>();
    const pwd = useRef<any>();
    const pwd1 = useRef<any>();
    const pwd2 = useRef<any>();
    const loginuser = useRef<any>();


    const [status, setstatus] = useState<string>("login");
    const [username, setusername] = useState<any>("");
    const [password, setpassword] = useState<string>("");
    const [password1, setpassword1] = useState<string>("");
    const [password2, setpassword2] = useState<string>("");
    const [username1, setusername1] = useState<any>("");

    let navigate = useNavigate();
    function handelStatus() {
        if (status === "login") {
            // 根据状态显示登陆或者注册内容
            regist.current.style.display = "none";
            login.current.style.display = "block";
            // 根据状态呈现对应的样式
            registhead.current.className = "regist";
            loginhead.current.className = "selectDefault";
            loginspan.current.style.display = "block";
            registspan.current.style.display = "none";

        } else {
            // 根据状态显示登陆或者注册内容
            login.current.style.display = "none";
            regist.current.style.display = "block";
            // 根据状态呈现对应的样式
            registhead.current.className = "selectDefault";
            loginhead.current.className = "login";
            loginspan.current.style.display = "none";
            registspan.current.style.display = "block";
        }
    }
    // 监听登陆或者注册的状态
    useEffect(handelStatus, [status]);

    function handelLogin(e: any) {
        e.preventDefault();
        // 判断用户格式是否正确
        let reg = /^[0-9A-Za-z]{6,11}$/;
        if (reg.test(username) === false) {
            setusername("");
            user.current.placeholder = "用户应为6~11字母、数字";
            user.current.setAttribute('class', "tel_input change")
        }
        // 判断密码格式是否正确
        let reg2 = /^(?=.*[a-zA-Z].*)(?=.*\W.*)(?=.*\d.*).{6,15}$/;
        console.log(reg2.test(password));
        if (reg2.test(password) === false) {
            setpassword("");
            pwd.current.placeholder = "输入6~15位并包含字母、数字、特殊字符";
            pwd.current.setAttribute('class', "tel_input change")
        }else if(reg2.test(password) === true){
            if (isSelect1.current.checked === false) {
                xieyi1.current.style.visibility = "inherit"
    
            } else if (isSelect1.current.checked === true) {
                xieyi1.current.style.visibility = "hidden";
                // 如果符合条件就发起请求
                axios.post("login",{
                    username,password
                }).then(res=>{
                    // code等于2代表登陆成功！
                    if(res.data.code===2){
                        setusername("");
                        setpassword("");
                    let d = new Date();
                    d.setTime(d.getTime()+(5*60*60*1000));
                    let t = d.toUTCString();
                    document.cookie = `username=${res.data.message[0].username};expires=${t}`;
                    document.cookie = `nickname=${res.data.message[0].nickname};expires=${t}`;
                    document.cookie = `url=${res.data.message[0].url};expires=${t}`;
                        navigate({pathname:"/"});

                    }else if(res.data.code===0){
                          // code等于0代表用户不存在！
                        setusername("");
                        user.current.placeholder = "用户不存在！";
                        user.current.setAttribute('class', "tel_input change")
                    }else if(res.data.code===1){
                         // code等于1代表密码！
                        setpassword("");
                        pwd.current.placeholder = "密码错误！";
                        pwd.current.setAttribute('class', "tel_input change")
                    }else if(res.data.code===4){
                        // code等于4代表用户为管理员！
                        navigate({pathname:"/Management/ManageMain"});
                   }
                })
               
            }
           
        }
        }

    function handelRegist() {
        
        // 判断用户格式是否正确
        let reg = /^[0-9A-Za-z]{6,11}$/;
        console.log(reg.test(username1));
        if (reg.test(username1) === false) {
            setusername1("");
            loginuser.current.placeholder = "用户应为6~11字母、数字";
            loginuser.current.setAttribute('class', "tel_input change")
        }
        // 判断密码格式是否正确
        let reg2 = /^(?=.*[a-zA-Z].*)(?=.*\W.*)(?=.*\d.*).{6,15}$/;
        console.log(reg2.test(password1));
        if (reg2.test(password1) === false) {
            setpassword1("");
            pwd1.current.placeholder = "6~15位并包含字母、数字、特殊字符";
            pwd1.current.setAttribute('class', "tel_input change")
        }
        //    判断两次密码是否相同
        if (password1 !== password2 || password2 === "") {
            setpassword2("");
            pwd2.current.placeholder = "两次输入不一致";
            pwd2.current.setAttribute('class', "tel_input change")
        }else if(password1 === password2){
            // 判断是否勾选协议
        if (isSelect2.current.checked === false) {
            xieyi2.current.style.visibility = "inherit"
        } else if (isSelect2.current.checked === true) {
            xieyi2.current.style.visibility = "hidden";
            axios.post("http://127.0.0.1:8200/regist",{
                username1,password1
            }).then(res=>{
                console.log(res.data);
                xieyi2.current.style.visibility = "inherit";
                xieyi2.current.innerText=res.data.msg;
                
            })
        }
         
        }

    }
    return (
        <div className="reAndlo">
            <div className="topcontent">
                <Link to={{ pathname: '/' }}><img src={Img1} alt="" /> </Link>
            </div>
            <div className="content">
                <div className="middelcontent">
                    <div> <img src={Img2} alt="" className="leftimg" /></div>
                    <div className="bigbox">
                        <div className="selectTop">
                            <ul>
                                <li ref={loginhead} className="login selectDefault" onClick={() => { setstatus("login") }}>
                                    密码登录<span ref={loginspan} className="biaoji"></span></li>
                                <li ref={registhead} className="regist" onClick={() => { setstatus("regist") }}>
                                    账号注册<span ref={registspan} className="biaoji"></span></li>
                            </ul>
                        </div>
                        {/* 登陆 */}
                        <div className="loginbox" ref={login}>
                            <div className="loginMiddel">
                                <div> <UserOutlined style={{ fontSize: "18px" }} />：<input className="tel_input" ref={user} value={username} onChange={(e: any) => { setusername(e.target.value) }} type="text" placeholder="请输入账号" />
                                </div>

                                <div> <LockOutlined style={{ fontSize: "18px" }} />：<input className="tel_input" value={password} ref={pwd} onChange={(e: any) => { setpassword(e.target.value) }} type="password" placeholder="请输入密码" /></div>
                                <p className="xieyi" ref={xieyi1}>请先同意豆果美食使用协议</p>
                                <button onClick={handelLogin}>登陆</button>

                                <p><input type="checkbox" ref={isSelect1} />我已阅读并且同意<a href="#">豆果美食协议</a></p>
                            </div >

                            <div className="loginBottom">
                                <p>社交账号登陆</p>
                                <p><img src={wxImg} alt="" />微信</p>
                                <p><img src={qqImg} alt="" />QQ</p>
                                <p><img src={wbImg} alt="" />微博</p>
                            </div>
                        </div>
                        {/* 注册 */}
                        <div className="registbox" ref={regist}>
                            <div className="loginMiddel">
                                <div> <UserOutlined style={{ fontSize: "18px" }} />：<input ref={loginuser} className="tel_input" type="text" placeholder="输入注册的账号" value={username1} onChange={(e: any) => { setusername1(e.target.value) }} /></div>
                                <div> <LockOutlined style={{ fontSize: "18px" }} />：<input ref={pwd1} className="tel_input" type="password" placeholder="请输入密码" value={password1} onChange={(e: any) => { setpassword1(e.target.value) }} /></div>
                                <div> <LockOutlined style={{ fontSize: "18px" }} />：<input ref={pwd2} className="tel_input" type="password" placeholder="再次确认密码" value={password2} onChange={(e: any) => { setpassword2(e.target.value) }} /></div>
                                <p className="xieyi" ref={xieyi2}>请先同意豆果美食使用协议</p>
                                <button onClick={handelRegist}>注册</button>

                                <p><input type="checkbox" ref={isSelect2} />我已阅读并且同意<a href="#">豆果美食协议</a></p>
                            </div >
                        </div>
                    </div>
                </div>
                <div className="buttomcontent">
                    <div>
                        <p>关于豆果 · 在豆果工作 · 意见反馈 · 友情链接 · 菜谱大全 · 品牌馆</p>
                        <p>©2009-2015 北京豆果信息技术有限公司 京ICP证111032号 京公网安备11010102001133号 京网文[2014]0774-174号</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginDome;
