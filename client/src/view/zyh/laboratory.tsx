
import react, { useState, useEffect, useRef } from "react"
import { Link } from 'react-router-dom';
import Header from "./header";
import Footer from "./footer";
import "./css/laboratory.css";
import test_jf from "../img/test_jf.png";
import test_hc from "../img/test_hc.png";
export default function Laboratory() {
    const [xiaoshi, Setxiaoshi] = useState<any>({ display: 'none' })
    const [xianshi, Setxianshi] = useState<any>({ display: 'none' });
    useEffect(() => {
        Setxianshi({ display: 'block' })
    }, [])
    const upimg = useRef<any>();
    function sfcesi(e: any) {
        if (e.target.innerHTML === '智能找菜' || e.target.innerHTML === '药品') {
            Setxiaoshi({ display: 'block' })
            Setxianshi({ display: 'none' })
        } else if (e.target.innerHTML === '豆果测试题') {
            Setxiaoshi({ display: 'none' })
            Setxianshi({ display: 'block' })
        }
    }


    return (
        <>
            <Header></Header>
            <div className="bx">
                <div className="bt" onClick={sfcesi}>
                    <h3>智能找菜</h3>
                    <h3>豆果测试题</h3>
                    <h3>药品</h3>
                </div>
                <div className="zw" style={xiaoshi}>
                    功能暂未开发，敬请期待
                </div>
                <div className="tp" style={xianshi}>
                    <Link to={{ pathname: '/Laboratory/textjf' }}><img style={{ marginRight: '5px' }} src={test_jf} alt="" /></Link>
                    <Link to={{ pathname: '/Laboratory/texthc' }}><img src={test_hc} alt="" /></Link>
                </div>
            </div>

            <Footer></Footer>
        </>
    )
}