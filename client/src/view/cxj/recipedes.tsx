import React,{useEffect, useState} from "react";
import img1 from "./img/menu.jpeg";
import repiceimg1 from "./img/repicenav1.jpg";
import repiceimg2 from "./img/repicenav2.jpg";
import repiceimg3 from "./img/repicenav3.jpg";
import repiceimg4 from "./img/repicenav4.jpg";
import zhanshi1 from "./img/zhanshi1.jpeg";
import zhanshi2 from "./img/zhanshi1.jpeg";
import zhanshi3 from "./img/zhanshi1.jpeg";
import zhanshi4 from "./img/zhanshi1.jpeg";
import rightimg3 from "./img/right3.png";
import { useParams } from "react-router-dom";


import { Carousel } from 'antd';
import Header from "../zyh/header";
import Footer from "../zyh/footer";
import Commen from "../zjy/Commen";
import "./css/recipedes.css";
import axios from "_axios@0.24.0@axios";
import { Content } from "_antd@4.16.13@antd/lib/layout/layout";


function Recipedes() {
        const [list,setlist]=useState<any>(null);
        const [step,setstep]=useState<any>(null);
        const [ingredient,setingredient]=useState<any>(null);
        let obj=useParams();
        let repiceid = obj.showsid;
        // let nickname=obj.showsnickname;
        // console.log(nickname,1111)
        useEffect(() => {
            showrecipe()
        }, [])
        useEffect(() => {
            showstep()
        }, [])
        useEffect(() => {
            showingredients() 
        }, [])
 
        function showrecipe() {
            axios.post("http://localhost:8200/showrepicedes",{
                repiceid:repiceid
            }).then(function(r:any){
                setlist(r.data.data);
                // console.log(JSON.parse(r.data.data[0].steps));
                setstep(JSON.parse(r.data.data[0].steps));
                // console.log(JSON.parse(r.data.data[0].describe));
               setingredient(JSON.parse(r.data.data[0].describ)); 
            })
        }


        


        function showingredients() {
            if(ingredient!==null){
                // console.log(ingredient);
                return ingredient.map(function(ingredientany:any,index:any){
                    return <div key={index} className="conedetails">
                                <span>{ingredientany.name}</span>
                                <span>{ingredientany.how}</span>
                        </div>
                })   
            }
            
        }

        function showstep() {
            if(step!==null){
                // console.log(step,2222);
                return step.map(function (stepany:any,index:any) {
                    return <div key={index} className="cmystyle">
                                <div className="cstepsonce">
                                    <div className="cstepimg">
                                        <img src={"http://localhost:8200"+ stepany.url} alt="" />
                                    </div>
                                    <div className="csteptextone">
                                        <p className="zsstep">{stepany.step}</p>
                                        <p className="zsdes">{stepany.des}</p>
                                    </div>
                                </div>

                         </div>
                    
                })
                
            }
           
            
        }
        function showrecipedes() {
            if(list!=null){
                return list.map(function (showsrecipeany:any) {
                    return  <div key={showsrecipeany.id}>
                                    <div className="cleftimg">  
                                        <img src={"http://localhost:8200"+showsrecipeany.img} alt="" /> 
                                    </div>
                                    <div className="cleftcontent">
                                        <p className="cleftmenuname">{showsrecipeany.menu_name}</p>
                                        <div className="goodsexc">
                                            <span className="qualitygoods">精品</span>
                                            <span className="exclusive">独家</span>
                                        </div>
                                        <div className="cleftlike">
                                            <div className="cleftlikel">
                                                <span className="clikenum">33</span>
                                                <span className="cliketext">收藏</span>
                                            </div>
                                            <div className="cleftliker">收藏</div>
                                        </div>
                                        <div className="cimfozrmation">
                                            <span className="cuserhead"><img src={img1} alt="" /></span>
                                            <span className="cleftname">{showsrecipeany.nickname}</span>
                                        </div>
                                    </div>
                                    <div className="cingredients">
                                        <p className="repiceingredients">{showsrecipeany.menu_name}的用料</p>
                                        <div className="cmytable">
                                     {   showingredients()}
                                        </div>
                                    </div>
                                       
                                    <div className="csteps">
                                        <p className="repiceingredients">{showsrecipeany.menu_name}的做法</p>
                                        {showstep()}
                                    
                                    </div>
                                </div>

                })
             }      
        }   
    
    return(
        <>
            <Header/>
            <div className="crecipedes">
                <div className="crecipedes_left">
                {showrecipedes()}
                <Commen/>

                </div>
               
                <div className="crecipedes_right">
                    <div className="crecipedes_right1">
                        <div className="cright1_img">
                            <img src={ repiceimg1} alt="" />
                            <p>cnc加工</p>
                        </div>
                        <div className="cright1_img">
                            <img src={ repiceimg2} alt="" />
                            <p>新手做包子教程</p>
                        </div>
                        <div className="cright1_img">
                            <img src={ repiceimg3} alt="" />
                            <p>寿司加盟</p>
                        </div>
                        <div className="cright1_img">
                            <img src={ repiceimg4} alt="" />
                            <p>学习制作蛋糕</p>
                        </div>
                    </div>
                    <div className="crecipedes_right2">
                    <p>食品展示</p>
                    <Carousel autoplay>
                        <div>
                            <img src={zhanshi1} alt="" />
                           
                        </div>
                        <div>
                        <img src={ zhanshi2} alt="" />
                           
                        </div>
                        <div>
                        <img src={ zhanshi3} alt="" />
                            
                        </div>
                        <div>
                        <img src={ zhanshi4} alt="" />
                            
                        </div>
                    </Carousel>,

                    </div>

                    <div className="crecipedes_right3">
                        <img src={rightimg3} alt="" />

                    </div>

                </div>

            </div>
           
            <Footer/>
        </>
    );

    
}
export default  Recipedes;