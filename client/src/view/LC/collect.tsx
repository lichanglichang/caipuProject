import React, { useEffect, useRef, useState } from "react";
import Header from "../zyh/header";
import axios from 'axios';
import Footer from "../zyh/footer";
import getCookieByKey from "../getCookie";
import ThemeContext from './MyContext';
import "./collect.css";
import { Menu } from 'antd';
import Gailan from "./Gailan";
import Caipu from "./Caipu";
import Caidan from "./Caidan";
import Biji from "./Biji";
import Shouc from "./Shouc";
import Meishi from "./Meishi";
import {useNavigate} from 'react-router-dom';

function CollectDemo() {
  let navigate = useNavigate();
  const [current, setcurrent] = useState<any>();
  const [addr, setaddr] = useState<any>();
  const [nickname, setnickname] = useState<any>();
  const [sex, setsex] = useState<any>();
  const [taste, settaste] = useState<any>();
  const [intro, setintro] = useState<any>();
  const [cliStatue, setcliStatue] = useState<any>("gailan");
  const [statue1, setstatue1] = useState<any>("gailan");
  const [guabzuuser, setguabzuuser] = useState<any>();
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
    axios
      .get("http://localhost:8200/getuser", {
        params: {
          username: getCookieByKey("username")
        }
      })
      .then(function (response: any) {
        console.log(response.data);
        let data = response.data[0];
        col_imgbox.current.style.backgroundImage = `url(${data.url})`;
        setnickname(data.nickname);
        setsex(data.sex);
        settaste(data.taste);
        setintro(data.introduce_myself);
        setaddr(data.address);
        huoquGZ();
      })
      .catch(function (error: any) {
        console.log(error);
      });
  }, [navigate]);

// 获取关注用户信息
  function huoquGZ(){
    axios
    .get("http://localhost:8200/getguanzu", {
      params: {
        username: getCookieByKey("username")
      }
    })
    .then(function (response: any) {
      setguabzuuser(response.data)
      console.log(response.data,"kkkkk");
    })
    .catch(function (error: any) {
      console.log(error);
    });

  }

  function handleClick(e: any) {
    setcurrent(e.key);
    setcliStatue(e.key)
  };
  const [current1, setcurrent1] = React.useState<any>("fan1");


  function handleClick1(e: any) {
    setcurrent1(e.key)
    console.log(current1);

  };

  function showuser(){
    let userArr =guabzuuser;
    if(userArr!==undefined){
      return userArr.map((item:any)=>{
        return <div key={item.id} style={{display:"flex",alignItems: "center",marginTop:"20px"}}><img style={{width:"60px",height:"60px",borderRadius:"30px"}} src={item.url} alt=""/>
        <div style={{margin:"20px"}}>{item.nickname}</div>
        <div className="gzword">已关注</div>
        </div>
      })
    }
    // return <div>hahha</div>

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
                    <div><p>4</p><p onClick={() => { setcurrent1("fan1"); setstatue1("guanzu"); setcliStatue("guanzu"); setcurrent("guanzu")}}>关注</p></div>
                    <div><p>0</p><p onClick={() => { setcurrent1("fan2"); setstatue1("guanzu"); setcliStatue("guanzu"); setcurrent("guanzu"); }}>粉丝</p></div>
                    <div><p>3</p><p onClick={() => { setstatue1("gailan"); setcliStatue("caipu"); setcurrent("caipu"); }}>菜谱</p></div>
                    <div><p>1</p><p onClick={() => { setstatue1("gailan"); setcliStatue("biji"); setcurrent("biji"); }}>笔记</p></div>
                  </div>
                </div>
              </div>
              <div className="statue1" style={{ display: (statue1 === 'gailan' ? 'block' : 'none') }}>
                <Menu onClick={handleClick} selectedKeys={current} mode="horizontal" defaultSelectedKeys={["gailan"]}>
                  <Menu.Item key="gailan">
                    概览
        </Menu.Item>
                  <Menu.Item key="caipu">
                    菜谱
        </Menu.Item>
                  <Menu.Item key="caidan">
                    菜单
        </Menu.Item>
                  <Menu.Item key="biji">
                    笔记
        </Menu.Item>
                  <Menu.Item key="shouc">
                    收藏
        </Menu.Item>
                  <Menu.Item key="meishi">
                    我的购物车
        </Menu.Item>
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
                      <Menu.Item key="fan1">
                        我关注的人
        </Menu.Item>
                      <Menu.Item key="fan2">
                        关注我的人
        </Menu.Item>
                    </Menu>
                    <div className="fan1" style={{ height: "200px", display: (current1 === 'fan1' ? 'block' : 'none') }}>

                    {showuser()}
                    </div>
                    <div className="fan1" style={{ height: "200px",lineHeight:"200px",display: (current1 === 'fan2' ? 'block' : 'none') }}>没有粉丝呢~快去发表增加人气吧</div>
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