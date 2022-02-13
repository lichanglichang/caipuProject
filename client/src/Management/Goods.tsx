import React, { useState, useRef, useContext } from "react";
import "./ManageScss/Content.scss";
import ThemeContext from "./MyContext";
import axios from "_axios@0.24.0@axios";
export default function Goods() {

    const obj = useContext(ThemeContext);
    //删除与修改
    function changGoods(e: any) {
        if (e.target.innerHTML == "修改") {

            console.log("修改商品")

        } else if (e.target.innerHTML == "删除") {

            let id = e.target.getAttribute("data-id");
            axios.get("/delGoods",
                {
                    params: { id: id }
                }).then((res: any) => {
                    console.log(res.data)
                    getAllGoods()
                });
        }
    }

    //添加商品
    const state = useRef<any>();
    function AddGoods(e: any) {
        if (e.target.innerHTML == "取消") {
            state.current.style.display = "none"

        } else if (e.target.innerHTML == "添加商品") {
            state.current.style.display = "block";
        } else if (e.target.innerHTML == "提交") {

            state.current.style.display = "none"
        }
    }

    //展示商品
    //分页展示
    const [goodsNum, setgoodsNum] = useState<any>(1);
    function changeNum(e: any) {
        if (e.target.innerHTML == "+") {
            setgoodsNum(goodsNum + 1);
        } else if (e.target.innerHTML == "-") {
            setgoodsNum(goodsNum - 1);
        }
    }
    const [goodsKw, setgoodsKw] = useState<any>("");
    function serchGoods(e: any) {
        setgoodsKw(e.target.value)
    }
    const [goodsList, setGoodsList] = useState<any>([]);
    function getAllGoods() {
        axios.get("/getAllGoods", {
            params: {
                num: goodsNum,
                kw: goodsKw
            }

        }).then((res: any) => {
            setGoodsList(res.data.data)
        });
    }
    React.useEffect(getAllGoods, [goodsNum,goodsKw]);
    function showGoods() {
        if (goodsList != null) {
            return goodsList.map(function (list: any) {
                return (<tr key={list.id}>
                    <td>{list.id}</td>
                    <td>{list.price}</td>
                    <td>{list.sales}</td>
                    <td>{list.address}</td>
                    <td>
                        <button type="button" data-id={list.id} >删除</button><br />
                        <button type="button" data-id={list.id} >修改</button>
                    </td>
                </tr>)
            })
        }
    }

    return (
        <div className="manage_usercontent" style={{ display: (obj.who == "商品" ? "block" : "none") }}>

            <div className="manage_serch" onClick={AddGoods}>

                搜索：<input type="text" onChange={serchGoods} />
                <button>添加商品</button>

                <div className="manage_addUser" ref={state}>
                    <ul>
                        <li>
                            商品名称：<input type="text" />
                        </li>
                        <li>
                            商品价格：<input type="text" />
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
                        <td>商品id</td>
                        <td>商品价格</td>
                        <td>商品销量</td>
                        <td>发货地址</td>
                        <td>信息管理</td>
                    </tr>
                </thead>

                <tbody onClick={changGoods}>
                    {
                        showGoods()
                    }
                </tbody>

                <tfoot onClick={changeNum}>
                    <tr >
                        <td>
                            <button>-</button>
                            <span>{goodsNum}</span>
                            <button>+</button>
                        </td>
                    </tr>
                </tfoot>


            </table>
        </div>


    )
}