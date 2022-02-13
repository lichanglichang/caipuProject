import React, { useState, useContext } from "react";
import "./ManageScss/Content.scss";
import ThemeContext from "./MyContext";
import axios from "_axios@0.24.0@axios";
export default function Recipe() {

    const obj = useContext(ThemeContext);
    //删除
    function changRecipe(e: any) {

        if (e.target.innerHTML === "删除") {
            let id = e.target.getAttribute("data-id");
            axios.get("/delRecipe",
                {
                    params: { id: id }
                }).then((res: any) => {
                    getAllRecipe()
                });
        }
    }
    //展示商品
    //分页展示
    const [RecipeNum, setRecipeNum] = useState<any>(1);
    function changeNum(e: any) {
        if (e.target.innerHTML === "+") {
            setRecipeNum(RecipeNum + 1);
        } else if (e.target.innerHTML === "-") {
            setRecipeNum(RecipeNum - 1);
        }
    }
    //关键词搜索
    const [RecipeKw, setRecipeKw] = useState<any>("");
    function serchRecipe(e: any) {
        setRecipeKw(e.target.value)
    }
    const [RecipeList, setRecipeList] = useState<any>([]);
    function getAllRecipe() {
        axios.get("/getAllRecipe", {
            params: {
                num: RecipeNum,
                kw: RecipeKw
            }

        }).then((res: any) => {
            console.log(res.data.data)
            setRecipeList(res.data.data)
        });
    }
    React.useEffect(getAllRecipe, [RecipeNum, RecipeKw]);
    function showRecipe() {
        if (RecipeList != null) {
            return RecipeList.map(function (list: any) {
                return (<tr key={list.id}>
                    <td>{list.id}</td>
                    <td>{list.nickname}</td>
                    <td>{list.menu_name}</td>
                    <td>{list.difficulty}</td>
                    <td>
                        <button type="button" data-id={list.id} >删除</button><br />
                        {/* <button type="button" data-id={list.id} >修改</button> */}
                    </td>
                </tr>)
            })
        }
    }

    return (
        <div className="manage_usercontent" style={{ display: (obj.who == "菜谱" ? "block" : "none") }}>

            <div className="manage_serch" >
                搜索：<input type="text" onChange={serchRecipe} />
            </div>

            <table >
                <thead>
                    <tr className="title">
                        <td>菜谱id</td>
                        <td>菜谱所属</td>
                        <td>菜谱名字</td>
                        <td>菜谱难度</td>
                        <td>信息管理</td>
                    </tr>
                </thead>

                <tbody onClick={changRecipe}>
                    {
                        showRecipe()
                    }
                </tbody>

                <tfoot onClick={changeNum}>
                    <tr >
                        <td>
                            <button>-</button>
                            <span>{RecipeNum}</span>
                            <button>+</button>
                        </td>
                    </tr>
                </tfoot>


            </table>
        </div>
    )
}