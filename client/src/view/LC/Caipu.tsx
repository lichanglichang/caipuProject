import React,{useState,useEffect} from 'react';
import ThemeContext from './MyContext';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import ma from "../zyh/css/main.module.css";
function Goods() {
	// obj--->{who:'goods', dispatch:f}
	const [rec, Setrec] = useState<any>();
	let navigate=useNavigate();
    useEffect(() => {
        showdata()
    }, [])
    function showdata() {
        axios.get("/getRecipe").then((res) => {
		let newarr =	res.data.filter((item:any)=>{
			return	item.nickname=="张宇浩";
			})
            Setrec(newarr)
            console.log(newarr);
            
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