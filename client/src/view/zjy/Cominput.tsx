import React, { useState,useEffect } from 'react';
import { Comment, Tooltip, List, Avatar, Form, Button, Input } from 'antd';
import moment from 'moment';
import GetC from "./GetC";
import axios from 'axios';
import ThemeContext from './MyContext';
import Show from './Show';

function Cominput() {
    const [comment, setComment] = useState<string>("")
    const [comments1, setComments1] = useState<any>(null)
    const [comments2, setComments2] = useState<any>(null)
    const [comments3, setComments3] = useState<any>(null)
    const [name1, setName1] = useState<any>(null)
    const [name2, setName2] = useState<any>(null)
    const [name3, setName3] = useState<any>(null)
    const cookie0 = document.cookie.split(';');
    const cookie1 = GetC(cookie0);
    const [url1, setUrl1] = useState<any>(null)
    const [url2, setUrl2] = useState<any>(null)
    const [url3, setUrl3] = useState<any>(null)

    //发送评论
    function SendCom() {
        axios.get("http://localhost:8200/getComment", {
            params: {
                comment: comment,
                username: cookie1
            }
        })
            .then(function (res: any) {
                if (res.data.code==3) {
                    alert("请登录！")
                }
                window.location.reload();
            })
            .catch(function (error: any) {
                console.log(error);
            });
    }

    //查询评论
    function ShowCom() {
        console.log("发起查询");
        
        axios.get("http://localhost:8200/showCom")
            .then(function (res: any) { 
                setComments1(res.data[0].comments)
                setComments2(res.data[1].comments)
                setComments3(res.data[2].comments)
                setName1(res.data[0].nickname)
                setName2(res.data[1].nickname)
                setName3(res.data[2].nickname)
                setUrl1(res.data[0].url)
                setUrl2(res.data[1].url)
                setUrl3(res.data[2].url)
            })
            .catch(function (error: any) {
                console.log(error);
            });
    }
    
    useEffect(ShowCom,[]);

    return (
        <ThemeContext.Provider value={{ comments1, comments2, comments3, name1,name2,name3,url1,url2,url3,cookie1}}>
            <div className="comm">
                <textarea className="comm-txt" value={comment} onChange={function (e: any) {
                    setComment(e.target.value)
                }}></textarea>
                <div onClick={SendCom}><button className="comm-btn" onClick={ShowCom}>发表评论</button></div>
            </div>
            <br /><br /><br /><br /><br />
            <Show />
        </ThemeContext.Provider>
    )
}

export default Cominput;