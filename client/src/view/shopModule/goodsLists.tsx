import React, { useState, useEffect } from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";

import "./css/goodsLists.css"
import Header from "../components/header";
import Footer from "../components/footer";

function Shopping() {
    
    let navigate = useNavigate();
    const gojump=(num:number)=>{
        // console.log(num);
        navigate({pathname:`/detail/${num}`});
        
    }
    const [list, setList] = useState<any>(null)
    useEffect(() => {
        ShowGoods()
    }, [])
    function ShowGoods() {
        axios.post("http://localhost:8200/shopInformation")
            .then(function (r: any) {
                // console.log(r.data.data.shopResult);   
                setList(r.data.data.shopResult);
                // console.log(list);
            })
    }
    
    function showshop() {
        if (list != null) {
            
            return list.map(function (shop: any) {
                return <div key={shop.id} className="innerdiv" onClick={gojump.bind(null,shop.id)} >
                    <div className="picq"><img src={shop.picture} alt="" /></div>
                    <div className="titleq"><h3>{shop.goodsname}</h3></div>
                    <div className="priceq"><span className="jiageq">￥{shop.price}</span>
                        <span className="volumeq">月售{shop.sales}</span>
                    </div>
                </div>
            })
        }
    }
  
    return (
        <>
        <Header></Header>
        <div className="outerq">
            {
            showshop()
            }
        </div>
        <Footer></Footer>
        </>
    )
}
export default Shopping;





