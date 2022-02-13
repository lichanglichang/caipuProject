import React, { useState ,useEffect} from "react";
import img1 from "./img/repicenav2.jpg"
import "./css/menus.css";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
function Menus(){
    let navigate=useNavigate();
    const[c,setc]=useState<any>(null);
    useEffect(() => {
        cshowmenus()
    }, [])
    const menusdes=(num:number)=> {
        navigate({pathname:`/menusdes/${num}`});

    }
    function cshowmenus(){

        axios.post("http://localhost:8200/showmenus",{
          
        })
		.then(function(r:any){
            setc(r.data)
		})
    }
    function showmany(){
        if(c!==null){
            return c.map(function(caidan:any,i:any){
                return(
                    <div className="csmalldes" key={i} onClick={menusdes.bind(null,caidan.menuid)}>
                        <img src={caidan.background} alt="" />
                        <div className="csmallintro">
                            <p>{caidan.menuname}</p>
                            <p>{JSON.parse(caidan.recipeid).length}道菜谱</p>
                        </div>

                    </div>

                );

            })
        }
    }
    return(
            <div className="cmenus">
                <h3 className="ctitle">精选菜谱</h3>
                <div className="cmenudes">
                    {showmany()}
                    <div className="cgeshi">
                    </div>
                    <div className="cgeshi">
                    </div>
                   
                </div>
            </div>
    );
}
export default Menus;