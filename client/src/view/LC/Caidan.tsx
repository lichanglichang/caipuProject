import React,{useState,useEffect} from 'react';
import ThemeContext from './MyContext';
import "../cxj/css/menus.css";
import {useNavigate} from 'react-router-dom';
import getCookieByKey from "../getCookie";
import axios from 'axios';
function Propose() {
	const cliStatue = React.useContext(ThemeContext);
	let navigate=useNavigate();
	const[c,setc]=useState<any>(null);
    useEffect(() => {
        cshowmenus()
    }, [])
    const menusdes=(num:number)=> {
        navigate({pathname:`/menusdes/${num}`});

    }
    function cshowmenus(){
        axios.get("http://localhost:8200/getcaidan",{
			params: {
				username: getCookieByKey("username")
			  }
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
		<div style={{display:(cliStatue==='caidan'?'block':'none'),marginTop:"20px"}}>
		 <div className="cmenus">
                <div className="cmenudes">
                    {showmany()}
                    <div className="cgeshi">
                    </div>
                    <div className="cgeshi">
                    </div>
                   
                </div>
            </div>
		</div>
	);
}
export default Propose;