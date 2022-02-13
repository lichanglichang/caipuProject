import React, { useState, useEffect } from "react";
import "./css/menusdes.css";
import img1 from "./img/repicenav2.jpg"
import Header from "../zyh/header";
import Footer from "../zyh/footer";
import axios from 'axios';
import { useParams } from "react-router-dom";
import {useNavigate} from 'react-router-dom';
function Menusdes() {
    let navigate=useNavigate();
    const [a, seta] = useState<any>(null);
    const [c, setc] = useState<any>(null);
    const repicedes=(num:number)=> {
        navigate({pathname:`/recipedes/${num}`});

    }
    useEffect(() => {
        showmenudes();
        // xxxx()
    }, [])
    let obj = useParams();
    let menusid = obj.menusid;

    function showmenudes() {
        axios.post("http://localhost:8200/showmenusdes", {
            menusid: menusid,

        })
            .then(function (r: any) {
                console.log(r.data);

                seta(r.data);
                console.log(r.data[0].recipeid);
                xxx(r.data[0].recipeid)
            })
        function xxx(value: any) {
            axios.post("http://localhost:8200/showmenuone", {
                newarr: value

            })
                .then(function (r: any) {
                    setc(r.data);
                    console.log(r.data, 1111);

                })
        }
    }



    function showc() {    
        if (c !== null) {
            return c.map(function (v: any) {
                return  <div className="czhanshi" key={v.id} onClick={repicedes.bind(null,v.id)}>
                            <div className='zhanshiimg'>
                                <img src={"http://localhost:8200"+v.img} alt="" />
                            </div>
                            <div className="ccontentbox">
                                <p className="ccaimin">{v.menu_name}</p>
                                <p className="cnickname">by {v.nickname}</p>
                            </div>
                    </div>
                
            })
        }

    }
    function show1() {
        if (a !== null) {
            return a.map(function (item: any, index: any) {
                return <div className="cmenubox" key={item}>
                    <h3>{item.menuname}</h3>
                    <div className="csmallbox">
                        <div className="headerself">
                            <img src={img1} alt="" />
                        </div>
                        <span className="selfname">{item.username}</span>
                    </div>
                    <p className="jieshao">{item.introduction}</p>
                    <div className="cmenuline"></div>
                    <div className="cShowmenudes">
                          {showc()}
                         
                    </div>
                </div>
                
            })
        }
    }






    return (
        <>
            <Header />
            <div className="cmenusdes">
                {show1()}



            </div>
            <Footer />
        </>
    );

}
export default Menusdes;