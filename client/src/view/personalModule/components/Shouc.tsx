import React from 'react';
import { Menu } from 'antd';
import ThemeContext from './MyContext';
import Shouc from "../css/shouc.module.css";
import ma from "../../zestful/css/main.module.css";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
function Propose() {
	const [current,setcurrent] = React.useState<any>("Cgailan");
  const [rec, Setrec] = React.useState<any>();
    const [not, Setnot] = React.useState<any>();
	let navigate=useNavigate();
  React.useEffect(() => {
        showdata()
    }, [])
    function showdata() {
        axios.get("/getRecipe").then((res) => {
            // console.log(res.data);
            Setrec(res.data)
        })
        axios.get("/getNotes").then((res) => {
            // console.log(res.data);
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
	function  handleClick(e:any){
        setcurrent(e.key); 
      };
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


	const cliStatue = React.useContext(ThemeContext);

	return(
		<div style={{height:'500px', display:(cliStatue==='shouc'?'block':'none')}}>
			<div className={Shouc.Colect_detail}>
			<Menu onClick={handleClick} selectedKeys={current} mode="horizontal" defaultSelectedKeys={["Cgailan"]}>
        <Menu.Item key="Cgailan" className={Shouc.online}>
         收藏的菜谱
        </Menu.Item>
        <Menu.Item key="Ccaipu">
          收藏的菜单
        </Menu.Item>
        <Menu.Item key="Ccaidan">
         收藏的笔记
        </Menu.Item>
      </Menu>
      <div className={Shouc.zhanshibox} style={{display:(current==='Cgailan'?'block':'none')}}>   <div>
                    <div className={ma.cpbox}>
                        {zccp()}
                    </div>
                </div></div>
      <div className={Shouc.zhanshibox} style={{height:'300px',lineHeight:"300px",display:(current==='Ccaipu'?'block':'none')}}>暂无收藏的菜单~</div>
      <div className={Shouc.zhanshibox} style={{height:'300px', display:(current==='Ccaidan'?'block':'none')}}> <div className={ma.notbox}>
                        {zcbj()}
                    </div></div>
			</div>


      
		</div>
	);
}
export default Propose;