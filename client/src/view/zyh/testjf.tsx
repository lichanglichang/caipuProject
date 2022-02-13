
import react from "react";

import jflogo from "../img/jflogo.jpg";
import jianfei from "./css/jianfei.module.css"
import {
    RightOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

export default function Textjf() {
    let ts:any=0;
    localStorage.setItem("tishu",ts)
    let grade:any=0;
    localStorage.setItem("cj",grade)
    return (
        <div style={{ width: '100vw' }}>
            <div className={jianfei.logo}>
            <Link to={{pathname:'/'}}><img src={jflogo} alt="" /></Link>
            </div>
            <div className={jianfei.bg}>
            <Link to={{ pathname: '/Laboratory/textjf/cesijf' }}>  <button className={jianfei.anniu} >开始测试<RightOutlined/></button></Link>             
            </div>
            <div className={jianfei.db}>©2009-2013 DouGuo.com 京ICP证111032号</div>
        </div>
    )
}