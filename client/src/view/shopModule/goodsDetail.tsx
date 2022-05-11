import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router";

import "./css/goodsDetails.css"
import getCookieByKey from "../getCookie"
import img1 from "../img/all.png"
import Header from "../components/header";
import Footer from "../components/footer";

function Detail() {
    let goodsid = useParams();
    let id = goodsid.id;
    const [number, setNumber] = useState<number>(1);
    const [goods, setGoods] = useState<any>(null);
    useEffect(() => {
        ShowDatail();
        // login()
    }, [])
    function ShowDatail() {
        // console.log(goodsid.id);
        axios.post("http://localhost:8200/shopdetailInformation", {
            goodid: id
        })
            .then(function (r: any) {
                // console.log(r.data);
                setGoods(r.data.shopdetailResult);
                // console.log(list);
            })
    }
    function shoppingcart() {
        // console.log(getCookieByKey);
        if (getCookieByKey("username") != null) {

            axios.post("http://localhost:8200/addlovegoods", {
                username: getCookieByKey("username"),
                goodsname: goods[0].goodsname,
                total_price: goods[0].price,
                img: goods[0].picture,
                number: number
            }).then(function (r: any) {
                alert("添加购物车成功")
            })
        } else {
            alert("您还未登陆，请先登陆")
        }
    }
    function showgoods() {
        if (goods != null) {
            return goods.map(function (goods: any) {
                return <div>
                    <div className='goodsinfoq' key={goods.id}>
                        <div className='goodssimgq'><img src={"http://localhost:8200/public/shopping/" + goods.picture} alt="" /></div>
                        <div className='goodsbimgq'>
                            <img src={"http://localhost:8200/public/shopping/" + goods.picture} alt="" />
                        </div>
                        <div className='infoq'>
                            <h3 className='goodsnameq'>{goods.goodsname}</h3>
                            <p className='descriptionq'>{goods.introduction}</p>
                            <div className='sellinfoq'>
                                <span className='priceq'>￥{goods.price}</span>
                                <div className='outerq'>
                                    <span>月售: {goods.sales}件</span>
                                    <span>发货地: {goods.address}</span>
                                </div>
                                <div className='buymodq relataveq'>
                                    <div className='buynumq'>
                                        <div className='jianq' onClick={() => { setNumber(number - 1) }}>-</div>
                                        <input className='buyNumq' type="text" value={number} onChange={function (e: any) { setNumber(e.target.value) }} />
                                        <div className='jiaq' onClick={() => { setNumber(number + 1) }}>+</div>
                                    </div>
                                    <div className='buyq' onClick={shoppingcart}>加入购物车</div>

                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='goodsimgq'>
                        <h3>商品详情</h3>
                        {/* <img src={img1} alt="" /> */}
                        <img src={"http://localhost:8200/public/shopping/" + goods.detailimg.split(",")[0]} alt="" />
                        <img src={"http://localhost:8200/public/shopping/" + goods.detailimg.split(",")[1]} alt="" />
                        <img src={"http://localhost:8200/public/shopping/" + goods.detailimg.split(",")[2]} alt="" />
                        <img src={"http://localhost:8200/public/shopping/" + goods.detailimg.split(",")[3]} alt="" />
                    </div>
                </div>
            })
        }
    }
    return (<>
        <Header></Header>
        <div className="detailq">
            {
                showgoods()
            }
        </div>
        <Footer></Footer>
    </>
    )

}
export default Detail;