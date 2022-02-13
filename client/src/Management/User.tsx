import React, { useState, useRef,useContext } from "react";
import ThemeContext from "./MyContext";
import axios from "_axios@0.24.0@axios";
import "./ManageScss/Content.scss";
export default function User() {
    const obj=useContext(ThemeContext);

    //分页展示
    const [userNum, setuserNum] = useState<any>(1);
    function changeNum(e: any) {
        if (e.target.innerHTML === "+") {
            setuserNum(userNum + 1);
        } else if (e.target.innerHTML === "-") {
            setuserNum(userNum - 1);
        }
    }
    //关键词搜索
    const [userKw, setuserKw] = useState<any>("");
    function serchUser(e: any) {
        setuserKw(e.target.value)
    }
    //获取用户信息
    const [userList, setuserList] = useState<any>([]);
    function getAllUser() {
        axios.get("/getAllUser", {
            params: {
                num: userNum,
                kw: userKw
            }
        }).then((res: any) => {
            setuserList(res.data.data)
        });
    }
    React.useEffect(getAllUser, [userNum, userKw]);
    //信息展示渲染
    function xxx() {
        if (userList != null) {
            return userList.map(function (list: any) {
                return (<tr key={list.id}>
                    <td>{list.id}</td>
                    <td>{list.nickname}</td>
                    <td>{list.username}</td>
                    <td>{list.sex}</td>
                    <td>
                        <button type="button" data-id={list.id} >修改</button>
                        <br />
                        <button type="button" data-id={list.id}  >删除</button>
                    </td>
                </tr>)
            })
        }
    }
    //修改与删除
    function changUser(e: any) {
        if (e.target.innerHTML === "修改") {
            console.log("修改用户")
        } else if (e.target.innerHTML === "删除") {
            let id = e.target.getAttribute("data-id");
            axios.get("/delUser",
                {
                    params: { id: id }
                }).then((res: any) => {
                    getAllUser()
                });
        }
    }
    const state = useRef<any>();
    const username=useRef<any>();
    const password=useRef<any>();
    const nickname=useRef<any>();
    const sex=useRef<any>();
    //添加用户 
    function AddUser(e: any) {
        if (e.target.innerHTML === "取消") {
            state.current.style.display = "none"
        }else if(e.target.innerHTML==="添加用户"){
            state.current.style.display = "block"; 
        }else if(e.target.innerHTML==="提交"){
            console.log(username.current.value)
            console.log(password.current.value)             
            axios.post("/addUser",{
                username:username.current.value,
                password:password.current.value,
                nickname:nickname.current.value,
                sex:sex.current.value
            })
            username.current.value='';
            password.current.value='';
            sex.current.value='';
            nickname.current.value='';
            state.current.style.display = "none"
        }
    }
    return (
        <div className="manage_usercontent" style={{display:(obj.who==="用户"?"block":"none")}}>

            <div className="manage_serch" onClick={AddUser}>
                搜索：<input type="text" onChange={serchUser} />
                <button>添加用户</button>
                <div className="manage_addUser" ref={state}>
                    <ul>
                        <li>
                            电话号码：<input type="text"  ref={username}/>
                        </li>
                        <li>
                            用户密码：<input type="text"  ref={password} />
                        </li>
                        <li>
                            用户昵称：<input type="text"  ref={nickname} />
                        </li>
                        <li>
                            用户性别：<input type="text"  ref={sex} />
                        </li>
                        <li>
                            <button>取消</button>
                            <button>提交</button>
                        </li>
                    </ul>
                </div>
            </div>
            
            <table >
                <thead>
                    <tr className="title">
                        <td>用户id</td>
                        <td>用户昵称</td>
                        <td>用户账号</td>
                        <td>用户性别</td>
                        <td>信息管理</td>
                    </tr>
                </thead>

                <tbody onClick={changUser}>
                    {
                        xxx()
                    }
                </tbody>

                <tfoot onClick={changeNum}>
                    <tr >
                        <td>
                            <button>-</button>
                            <span>{userNum}</span>
                            <button>+</button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>

    )
}