import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import Header from "../components/header";
import Footer from "../components/footer";
import getCookieByKey from "../getCookie";
import ThemeContext from './components/MyContext';
import "./css/collect.css";
import { Menu } from 'antd';
import Gailan from "./components/Gailan";
import Caipu from "./components/Caipu";
import Caidan from "./components/Caidan";
import Biji from "./components/Biji";
import Shouc from "./components/Shouc";
import Meishi from "./components/Meishi";
import {useNavigate} from 'react-router-dom';
import { RollbackOutlined } from "@ant-design/icons";

function CollectDemo() {
  let navigate = useNavigate();
  const [current, setcurrent] = useState<any>();
  const [addr, setaddr] = useState<any>();
  const [nickname, setnickname] = useState<any>();
  const [sex, setsex] = useState<any>();
  const [taste, settaste] = useState<any>();
  const [intro, setintro] = useState<any>();
  const [cliStatue, setcliStatue] = useState<any>("meishi");
  const [statue1, setstatue1] = useState<any>("meishi");
  const [guabzuuser, setguabzuuser] = useState<any>();//关注
  const [myFans, setmyFans] = useState<any>();//粉丝
  const col_imgbox = useRef<any>();

  // 改变主页内容
  // function change(value: any) {
  //   setcliStatue(value)
  // }
  useEffect(() => {
      // 进入界面时，判断是否为登陆转态
      if(getCookieByKey("nickname")===null){
        navigate({pathname:"/"});
      };
    // 获取当前用户信息
    axios.get("http://localhost:8200/getuser", {
        params: {
          username: getCookieByKey("username")
        }
    }).then(function (response: any) {
      console.log(response.data,'userInfo');
      let data = response.data[0];
      col_imgbox.current.style.backgroundImage = `url(${data.url})`;
      setnickname(data.nickname);
      setsex(data.sex);
      settaste(data.taste);
      setintro(data.introduce_myself);
      setaddr(data.address);
      huoquGZ();
      getAllfans();
    }).catch(function (error: any) {
      // console.log(error);
    });
  }, [navigate]);

  // 获取关注用户信息
  function huoquGZ(){
    axios.get("http://localhost:8200/getguanzu", {
      params: {
        username: getCookieByKey("username")
      }
    }).then(function (response: any) {
      setguabzuuser(response.data)
      // console.log(response.data,"关注用户");
    })
  }

  // 获取粉丝信息
  function getAllfans(){
    axios.get("http://localhost:8200/getFans", {
      params: {
        username: getCookieByKey("username")
      }
    }).then(function (response: any) {
      setmyFans(response.data)
      // console.log(response.data,"粉丝用户");
    })

  }

  function handleClick(e: any) {
    setcurrent(e.key);
    setcliStatue(e.key)
  };
  const [current1, setcurrent1] = React.useState<any>("fan1");


  function handleClick1(e: any) {
    setcurrent1(e.key)
    // console.log(current1);

  };
  // 展示关注者或粉丝
  function showFocusOrfans() {
    
    if (current1 === 'fan1') {
      let userArr = guabzuuser;
      if (userArr !== undefined) {
        if (userArr.length) {
          return userArr.map((item:any)=>{
            return <div key={item.id} style={{display:"flex",alignItems: "center",marginTop:"20px"}}><img style={{width:"60px",height:"60px",borderRadius:"30px"}} src={item.url} alt=""/>
              <div style={{margin:"20px"}}>{item.nickname}</div>
              <div className="gzword">已关注</div>
            </div>
          })
        } else {
          return <div>还没有关注任何人哦~快去关注喜欢的朋友吧</div>
        }
        
      } else {
        return <div>还没有关注任何人哦~快去关注喜欢的朋友吧</div>
      }
    } else if (current1 === 'fan2') {
      let fansArr = myFans;
      if (fansArr !== undefined) {
        if (fansArr.length) {
          return fansArr.map((item:any)=>{
            return <div key={item.id} style={{display:"flex",alignItems: "center",marginTop:"20px"}}><img style={{width:"60px",height:"60px",borderRadius:"30px"}} src={item.url} alt=""/>
              <div style={{margin:"20px"}}>{item.nickname}</div>
              <div className="gzword">关注</div>
            </div>
          })
        } else {
          return <div>没有粉丝呢~快去发表增加人气吧</div>
        }
        
      } else {
        return <div>没有粉丝呢~快去发表增加人气吧</div>
      }
    }
    
    

  }
  return (
    <>
      <div>
        <Header />
        <ThemeContext.Provider value={cliStatue}>
          <div className="Col_box" >
            <div className="col_content">
              <div className="col_head">
                <div className="col_infor">
                  <div className="col_imgbox" ref={col_imgbox}></div>
                  <div className="col_detail">
                    <p><span className="nickname">{nickname}</span></p>
                    <p>{sex}<span className="addr">{addr}</span></p>
                    <p>口味：{taste}</p>
                    <p>个人介绍：{intro}</p>
                  </div>
                </div>
                <div className="col_select">
                  <div className="col_selectitem">
                    <div><p>{ guabzuuser? guabzuuser.length: 'null' }</p><p onClick={() => { setcurrent1("fan1"); setstatue1("guanzu"); setcliStatue("guanzu"); setcurrent("guanzu")}}>关注</p></div>
                    <div><p>{ myFans? myFans.length: 'null' }</p><p onClick={() => { setcurrent1("fan2"); setstatue1("guanzu"); setcliStatue("guanzu"); setcurrent("guanzu"); }}>粉丝</p></div>
                    <div><p onClick={() => { setstatue1("meishi"); setcliStatue("meishi"); setcurrent("meishi"); }} style={{margin: '10px 0 0 10px'}}>返回<RollbackOutlined /></p></div>
                  </div>
                </div>
              </div>
              <div className="statue1" style={{ display: (statue1 === 'meishi' ? 'block' : 'none') }}>
                <Menu onClick={handleClick} selectedKeys={current} mode="horizontal" defaultSelectedKeys={["meishi"]}>
                  {/* <Menu.Item key="gailan"> 概览 </Menu.Item> */}
                  <Menu.Item key="meishi"> 我的购物车 </Menu.Item>
                  <Menu.Item key="caipu"> 菜谱 </Menu.Item>
                  <Menu.Item key="caidan"> 菜单 </Menu.Item>
                  <Menu.Item key="biji"> 笔记 </Menu.Item>
                  {/* <Menu.Item key="shouc"> 收藏 </Menu.Item> */}
                </Menu>
                <div className="col_itembox">
                  <Gailan />
                  <Caipu />
                  <Caidan />
                  <Biji />
                  <Shouc />
                  <Meishi />

                </div>
              </div>

              <div style={{ display: (statue1 === 'guanzu' ? 'block' : 'none') }}>
                <div style={{ height: '500px', display: (cliStatue === 'guanzu' ? 'block' : 'none') }}>
                  <div className="Colect_detail">
                    <Menu onClick={handleClick1} selectedKeys={current1} mode="horizontal" defaultSelectedKeys={[current1]}>
                      <Menu.Item key="fan1"> 我关注的人 </Menu.Item>
                      <Menu.Item key="fan2"> 关注我的人 </Menu.Item>
                    </Menu>

                    <div className="fan1" style={{ lineHeight: "200px",paddingLeft:"50px"}}>

                      {showFocusOrfans()}

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </ThemeContext.Provider>



      </div>
      <Footer />
    </>
  )
}
export default CollectDemo;