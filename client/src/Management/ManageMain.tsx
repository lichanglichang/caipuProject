import React from "react";
import "./ManageScss/Main.scss";
//侧面导航
import Nav from "./Nav"
//用户
import User from "./User";
//菜单
import Menu from "./Menu";
//菜谱
import Recipe from "./Recipe";
//笔记
import Note from "./Note";
//shangp
import Goods from "./Goods";

import ThemeContext from "./MyContext";

import {useNavigate} from "react-router-dom";

function ManageMain() {

    function reducer(state:string,action:string){
        return action;
    }
    const [who,dispatch]=React.useReducer(reducer,"用户")

    let navigate = useNavigate();

    function backLogin(){
        navigate({pathname:`/Login`});
    }
    return (
        <>
            <ThemeContext.Provider  value={{who,dispatch}}>
                <div className="manage_l">

                    <div className="ManageMain">
                        <h2 className="manage_header">
                            豆果管理系统
                            <div  className="manage_button"  onClick={backLogin}>退出登陆</div>
                        </h2>
                        <div className="manage_content">

                            <div className="manage_navigation">
                                <Nav></Nav>
                            </div>

                            <div className="manage_details">
                                <User></User>
                                <Menu></Menu>
                                <Recipe></Recipe>                                
                                <Note></Note>                                
                                <Goods></Goods>                                
                            </div>
                        </div>
                    </div>
                </div>
            </ThemeContext.Provider>
        </>
    )
}
export default ManageMain;