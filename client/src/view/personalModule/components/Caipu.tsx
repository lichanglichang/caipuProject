import React,{useState,useEffect} from 'react';
import ThemeContext from './MyContext';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import ma from "../../zestful/css/main.module.css";
import GetC from '../../zjy/GetC';
function Goods() {
	// obj--->{who:'goods', dispatch:f}
	const [rec, Setrec] = useState<any>();
    const cookie0 = document.cookie.split(";");
    const cookie1 = GetC(cookie0);
	let navigate=useNavigate();
    useEffect(() => {
        showdata()
    }, [])
    function showdata() {
        axios.get("/queryPublishRecipe",{params:{username:cookie1}}).then((res) => {
            Setrec(res.data)
            
        })
    }
    //展示菜谱
    function zccp() {
        if (rec) {
            
            return rec.map((item: any) => {
                return (
                    <div key={item.id} onClick={tzcp}>
                        <div><img src={"http://localhost:8200"+item.img} alt={item.id} /></div>
                        <div data-id={item.id} style={{marginTop:'10px'}}>{item.menu_name}</div>
                        <div >by {item.nickname}</div>
                    </div>
                )
            })
        } else {
            return <div style={{ lineHeight: "300px", width: "700px", height: '300px', color: "green", textAlign: "center" }}>
				暂无菜谱！！！
			</div>
        }
    }
    //跳转菜谱详情
    function tzcp(e:any){
        if(e.target.dataset.id){
            navigate({pathname:`/Recipedes/${e.target.dataset.id}`})
        }
        if(e.target.alt){
            navigate({pathname:`/Recipedes/${e.target.alt}`})
        }
    }
    
	const cliStatue = React.useContext(ThemeContext);
	return(
		<div style={{display:(cliStatue==='caipu'?'block':'none')}}>
			{/* 还没有发布菜谱~ */}
			<div className={ma.bx}>
                <div>
                    <div className={ma.mrcp}>
                    </div>
                    <div className={ma.cpbox}>
                        {zccp()}
                    </div>
                </div>
            </div>
		</div>
	);
}
export default Goods;