

import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import logo from "../img/logo3.png";
import getCookieByKey from "../getCookie";
import "./css/header.css";
import axios from "axios";
import {
    DownOutlined,
    SearchOutlined,
} from '@ant-design/icons';



export default function Main() {
    const daohanglan = useRef<any>();
    window.onscroll = function () {
        let topScroll = document.body.scrollTop || document.documentElement.scrollTop;
        if (topScroll > 300) {
            if (daohanglan) {
                daohanglan.current.style.position = 'fixed';
                daohanglan.current.style.top = '0';
                daohanglan.current.style.zIndex = '9999';
                daohanglan.current.style.backgroundColor = 'white'
            }
        } else {
            if (daohanglan) {
                daohanglan.current.style.position = 'static';
            }
        }
    }
    const [kw, Setkw] = useState<any>();
    const loginbox = useRef<any>();
    const userbox = useRef<any>();
    const touX = useRef<any>();
    let navigate = useNavigate();
    const [nickname2, setnickname2] = useState<any>();
    // 清楚cookie
    function clearAllCookie() {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (var i = keys.length; i--;)
                document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
        }
    }
    function exitlogin() {
        loginbox.current.style.display = "block";
        userbox.current.style.display = "none";
        clearAllCookie();
        navigate({ pathname: "/" });

    }
    function upNotes() {
        navigate({ pathname: `/Create/Note` });
    }



    useEffect(() => {

        if (!(getCookieByKey("nickname") == null)) {
            loginbox.current.style.display = "none";
            userbox.current.style.display = "block";
            axios.get("http://localhost:8200/getuser", {
                    params: {
                        username: getCookieByKey("username")
                    }
                })
                .then(function (response: any) {

                    let data = response.data[0];
                    touX.current.style.backgroundImage = `url(${data.url})`;
                    setnickname2(data.nickname);
                })
                .catch(function (error: any) {
                    console.log(error);
                });
        } else {
            loginbox.current.style.display = "block";
            userbox.current.style.display = "none";

        }
    }, [])
    function serachvalue(e: any) {
        Setkw(e.target.value)
    }
    function myserach() {
        if (kw) {
            navigate({ pathname: `/search/${kw}` });
        }
    }
    const fb = useRef<any>();
    const createup = useRef<any>();
    function xsfb(e: any) {
        createup.current.style.display = 'block'
    }
    function bxsfb() {
        createup.current.style.display = 'none'
    }
    function upcaipu() {
        if (getCookieByKey('nickname')) {
            navigate({ pathname: `/Releaser` })
        } else {
            navigate({ pathname: `/Login` });
        }

    }
    function upcaidan() {
        if (getCookieByKey('nickname')) {
            navigate({ pathname: `/uploadcaidan` });
        } else {
            navigate({ pathname: `/Login` });
        }

    }
    // touX.current.style.backgroundImage=`url(${getCookieByKey("url")})`;
    // setnickname2(getCookieByKey("nickname"));





    return (
        <div className="w" ref={daohanglan} >
            <header>
                <div>
                    <Link to={{ pathname: '/' }}><img className="lg"  alt="" src={logo}/></Link>
                </div>
                <div>
                    <Link to={{ pathname: '/' }}>首页</Link>
                </div>
                <div>
                    <Link to={{ pathname: '/Menu' }}>菜谱</Link>
                </div>
                <div>
                    <Link to={{ pathname: '/Notes' }}>笔记</Link>
                </div>
                <div>
                    <Link to={{ pathname: '/shop' }}>商城</Link>
                </div>
                <div>
                    <Link to={{ pathname: '/comic' }}>动漫</Link>
                </div>
                <div >
                    <Link to={{ pathname: '/Laboratory' }}>有滋味实验室</Link>
                </div>
                <div onMouseEnter={bxsfb} className="searchBox">
                    <input className="searchInput" type="search" onChange={serachvalue} placeholder="搜索菜单、菜谱、用户" />
                    <span onClick={myserach} className="searchIcon"><SearchOutlined /></span>
                </div>
                <div className="fb" ref={fb} onMouseEnter={xsfb} >
                    发布
                    <div className="cre" ref={createup} onMouseLeave={bxsfb}>
                        <div onClick={upcaipu}>发布菜谱</div>
                        <div onClick={upcaidan}>创建菜单</div>
                        <div onClick={upNotes}>创建笔记</div>
                    </div>
                </div>
                <div className="lr" onMouseEnter={bxsfb}>
                    <div ref={loginbox}><Link to={{ pathname: '/Login' }}><span>登陆 | 注册</span></Link></div>
                    <div ref={userbox} className="personbox"><Link to={{ pathname: '/collect' }}><div className="touxiang" ref={touX}></div>{nickname2}</Link>
                        <div className="UserBox">
                            <ul>
                                <li><Link to={{ pathname: '/collect' }}>我的收藏</Link></li>
                                <li><Link to={{ pathname: '/Updatainfo' }}>修改信息</Link></li>
                                <li onClick={exitlogin}>退出登陆</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </header>
        </div>

    )

}
