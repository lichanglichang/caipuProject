import React, { useState, useRef,useEffect} from "react";
import Header from "../zyh/header";
import Footer from "../zyh/footer";
import axios from 'axios';
import "./Updatainfo.css";
import {useNavigate} from 'react-router-dom';

import getCookieByKey from "../getCookie"
function Updatainfo() {
    let navigate = useNavigate();
  
    const [imgURL, setImgURL] = useState<any>(getCookieByKey("url"));
    const [year,setyear] = useState<any>("1999");
    const [Saddr,setSaddr] = useState<any>("重庆");
    const [Sstyle,setSstyle] = useState<any>("酸");
    const [nickname1,setnickname1] = useState<any>("");
    const [intro,setintro] = useState<any>("");

    const submitImg = useRef<any>();
    const nickname = useRef<any>();
    const boy = useRef<any>();
    const girl = useRef<any>();
    const birthday = useRef<any>();
    const addres = useRef<any>();
    const style = useRef<any>();
    const intraduce = useRef<any>();

    // 头像预览
    function uploadImg(e: any) {
        e.preventDefault();
        let file = submitImg.current.files[0];
        let touX = window.URL.createObjectURL(file);
        setImgURL(touX);
    }
    // 修改信息
    function Submitinfor(e: any) {
        e.preventDefault();
        let aftername = nickname.current.value;
        let aftersex = boy.current.checked;
        let afterintro = intraduce.current.value;
        let afterbirth = birthday.current.value;
        let afteraddr = addres.current.value;
        let afterstyle = style.current.value;
        if (boy.current.checked === true) {
            aftersex = "男";
        } else {
            aftersex = "女";
        }

        let file = submitImg.current.files[0];
        let user: any = getCookieByKey("username");
        let formData = new FormData();
        formData.append("uploadFile", file);
        formData.append("username1", user);
        formData.append("nickname1", aftername);
        formData.append("sex1", aftersex);
        formData.append("introduce_myself1", afterintro);
        formData.append("birthday1", afterbirth);
        formData.append("address1", afteraddr);
        formData.append("taste1", afterstyle);
         const config = {
        	headers: {
        		"Content-Type": "multipart/form-data;boundary=" + new Date().getTime()
        	}
        };
      
       
        if (file) {
            axios
                .post("http://localhost:8200/uploadimg", formData,config)
                .then(function (response: any) {
                    setImgURL(response.data);
                    navigate({pathname:"/collect"});
                })
                .catch(function (error: any) {
                    console.log(error);
                });
        }
     
 
    }
    useEffect(()=>{
          // 进入界面时，判断是否为登陆转态
    if(getCookieByKey("nickname")===null){
        navigate({pathname:"/"});
    }
        axios
        .get("http://localhost:8200/getuser", {
            params: {
              username: getCookieByKey("username")
            }
          })
        .then(function (response: any) {
            console.log(response.data);
            let data =response.data[0];
            setyear(data.birthday);
            setImgURL(data.url);
            setSaddr(data.address);
            setSstyle(data.taste);
            setnickname1(data.nickname);
            setintro(data.introduce_myself);
            if(response.data[0].sex==="女"){
                girl.current.checked=true;
            }else{
                boy.current.checked=true; 
            }
        })
        .catch(function (error: any) {
            console.log(error);
        });
    },[])
    return (
        <div>
           
           <Header/>
           <div className="personBox">
                <h2>基本资料</h2>
                <div className="perSBox">
                    <div className="imgbox"><img src={imgURL} alt="" /></div>
                        <div className="yulanbox">预览头像<input type="file" ref={submitImg} onChange={uploadImg} className="yulan"/></div>
                    <p className="Pname"><span>昵称</span><input type="text" ref={nickname} value={nickname1} onChange={(e:any)=>{setnickname1(e.target.value)}}/></p>
                    <p className="sexbox"><span>性别</span><input type="radio" value="男" name="sex" ref={boy} />男 <input name="sex" type="radio" value="女" ref={girl}/>女</p>
                    <p><span>生日</span>
                    <select name="" id="" ref={birthday} value={year} onChange={(e:any)=>{setyear(e.target.value)}}>
                        <option value="2001">2001</option>
                        <option value="2000">2000</option>
                        <option value="1999">1999</option>
                        <option value="1998">1998</option>
                        <option value="1997">1997</option>
                        <option value="1996">1996</option>
                    </select>
                    <select style={{marginLeft:"10px"}} name="" id="">
                        <option value="1">1月</option>
                        <option value="2">2月</option>
                        <option value="3">3月</option>
                        <option value="4">4月</option>
                        <option value="5">5月</option>
                        <option value="6">6月</option>
                        <option value="7">7月</option>
                        <option value="8">8月</option>
                        <option value="9">9月</option>
                        <option value="10">10月</option>
                        <option value="11">11月</option>
                        <option value="12">12月</option>
                    </select>
                    </p>
                    <p><span>地址</span>
                    <select name="" id="" ref={addres} value={Saddr} onChange={(e:any)=>{setSaddr(e.target.value)}}>
                        <option value="重庆">重庆</option>
                        <option value="四川">四川</option>
                        <option value="湖北">湖北</option>
                        <option value="上海">上海</option></select></p>
                    <p><span>口味</span>
                        <select name="" id="" ref={style} value={Sstyle} onChange={(e:any)=>{setSstyle(e.target.value)}}>
                            <option value="酸">酸</option>
                            <option value="辣">辣</option>
                            <option value="甜">甜</option>
                            <option value="苦">苦</option></select>
                    </p>
                    <p><span>自我介绍</span>
                        <br></br>
                        <textarea ref={intraduce} value={intro} onChange={(e:any)=>{setintro(e.target.value)}} name="" id="" placeholder="介绍下自己，填写你认为自己称得美食达人的理由。
比如: .
你是否烧得一好菜
你是否喜欢记录美食日记，与大家分享?
"></textarea>
                    </p>
                    <button className="submit" onClick={Submitinfor}>保存</button>
                </div>

            </div>
            

           
            <Footer />
        </div>

    )
}
export default Updatainfo;