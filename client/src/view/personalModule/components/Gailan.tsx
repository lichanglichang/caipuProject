import React,{useState,useEffect} from 'react';
import ThemeContext from './MyContext';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import "../../recipeMenuModule/css/menuTotal.css";
import ma from "../../zestful/css/main.module.css";
function About() {
	const cliStatue = React.useContext(ThemeContext);
    const [rec, Setrec] = useState<any>();
    const [not, Setnot] = useState<any>();
	let navigate=useNavigate();
    useEffect(() => {
        showdata()
    }, [])
    function showdata() {
        axios.get("/getRecipe").then((res) => {
            console.log(res.data,'菜谱');
            Setrec(res.data)
        })
        axios.get("/getNotes").then((res) => {
            console.log(res.data,'笔记');
            Setnot(res.data)
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
    //展示笔记
    function zcbj() {
        if (not) {
            return not.map((item: any) => {
                return (
                    <div key={item.id} onClick={tzbj}>
                        <div><img src={JSON.parse(item.picture)[0]} alt={item.id} className={ma.bjtp}/></div>
                        <div>
                            <div data-id={item.id} className={ma.bjbt} style={{margin:'5px 0'}}>{item.title}</div>
                            <div><img className={ma.notyh} src={item.userpic} alt="" />{item.username}</div>
                        </div>
                    </div>
                )
            })
        }
    }
    //跳转笔记
    function tzbj(e:any){
        if(e.target.dataset.id){
            navigate({pathname:`/Notes/Details/${e.target.dataset.id}`})
        }
        if(e.target.alt){
            navigate({pathname:`/Notes/Details/${e.target.alt}`})
        }
    }

    
	return(
		<div style={{display:(cliStatue==='gailan'?'block':'none')}}>
			   <div className={ma.bx}>
                <div>
                    <div className={ma.mrcp}>
                        <span style={{height:"50px"}}>我收藏的菜谱</span>
                    </div>
                    <div className={ma.cpbox}>
                        {zccp()}
                    </div>
                </div>
                <div>
                    <div className={ma.mrcp}>
                        <span>我收藏的笔记</span>
                       
                    </div>
                    <div className={ma.notbox}>
                        {zcbj()}
                    </div>
                </div>
            </div>
		</div>
	);
}
export default About;