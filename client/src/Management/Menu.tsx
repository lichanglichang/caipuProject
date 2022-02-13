import React, { useState, useContext } from "react";
import "./ManageScss/Content.scss";
import ThemeContext from "./MyContext";
import axios from "_axios@0.24.0@axios";
export default function Menu() {

    const obj = useContext(ThemeContext);
    //展示菜单
    //分页
    const [MenuNum, Menu] = useState<any>(1);
    function changeNum(e: any) {
        if (e.target.innerHTML == "+") {
            Menu(MenuNum + 1);
        } else if (e.target.innerHTML == "-") {
            Menu(MenuNum - 1); 
        }
    }
    //关键词搜索
    const [MenuKw, setMenuKw] = useState<any>("");
    function serchMenu(e: any) {
        setMenuKw(e.target.value)
    }
    const [MenuList, setMenuList] = useState<any>([]);
    function getAllMenu() {
        axios.get("/getAllMenu", {
            params: {
                num: MenuNum,
                kw: MenuKw
            }

        }).then((res: any) => {
            setMenuList(res.data.data)
        });
    }
    React.useEffect(getAllMenu, [MenuNum, MenuKw]);
    function showMenu() {
        if (MenuList != null) {
            return MenuList.map(function (list: any) {
                return (<tr key={list.menuid}>
                    <td>{list.menuid}</td>
                    <td>{list.username}</td>
                    <td>{list.menuname}</td>
                    <td>{list.recipeid}</td>
                    <td>
                        <button type="button" data-id={list.id} >删除</button><br />
                    </td>
                </tr>)  
            })
        }
    }


    //删除
    function delMenu(e: any) {
        if (e.target.innerHTML == "删除") {
            let id = e.target.getAttribute("data-id");
            axios.get("/delMenu",
                {
                    params: { id: id }
                }).then((res: any) => {
                    getAllMenu()
                });
        }
    }

    return (
        <div className="manage_usercontent" style={{ display: (obj.who == "菜单" ? "block" : "none") }}>
            <div className="manage_serch" >
                搜索：<input type="text" onChange={serchMenu} />
            </div>
            
            <table >
                <thead>
                    <tr className="title">
                        <td>菜单id</td>
                        <td>菜单所属</td>
                        <td>菜单名字</td>
                        <td>所属菜谱</td>
                        <td>信息管理</td>
                    </tr>
                </thead>

                <tbody onClick={delMenu}>
                    {
                        showMenu()
                    }
                </tbody>

                <tfoot onClick={changeNum}>
                    <tr >
                        <td>
                            <button>-</button>
                            <span>{MenuNum}</span>
                            <button>+</button>
                        </td>
                    </tr>
                </tfoot>


            </table>
        </div>
    )
}