
import react from "react"
import Header from "./header"
import Footer from "./footer"
import c1 from "../img/cart2_1.jpg";
import c2 from "../img/cart2_2.jpg";
import c3 from "../img/cart2_3.jpg";
import c4 from "../img/cart2_4.jpg";
import c5 from "../img/cart2_5.jpg";
import c6 from "../img/cart2_6.jpg";
import c10 from "../img/cart2_10.jpg";
import c11 from "../img/cart2_11.jpg";
import c12 from "../img/cart2_12.jpg";
import c13 from "../img/cart2_13.jpg";
import c14 from "../img/cart2_14.jpg";
import c15 from "../img/cart2_15.jpg";
import c16 from "../img/cart2_16.jpg";
import c17 from "../img/cart2_17.jpg";
import c18 from "../img/cart2_18.jpg";
import c19 from "../img/cart2_19.jpg";
import c20 from "../img/cart2_20.jpg";
import c21 from "../img/cart2_21.jpg";
import c22 from "../img/cart2_22.jpg";
import c23 from "../img/cart2_23.jpg";
import c24 from "../img/cart2_24.jpg";
import c25 from "../img/cart2_25.jpg";
import c26 from "../img/cart2_26.jpg";
import cm from "./css/comic.module.css";

import { useNavigate } from 'react-router-dom';


export default function Comic() {
    let navigate = useNavigate();
    let imgbox: any = [];
    imgbox.push({ "url": c1, "des": '美味的夜宵', "id": 1 },
        { "url": c2, "des": '绿色的早餐', "id": 2 },
        { "url": c3, "des": '好吃的面', "id": 3 },
        { "url": c4, "des": '汤圆-夜宵', "id": 4 },
        { "url": c5, "des": '暖暖的晚餐', "id": 5 },
        { "url": c6, "des": '午饭的诱惑', "id": 6 },
        { "url": c10, "des": '一月小寒&大寒', "id": 10 },
        { "url": c11, "des": '二月立春&雨水', "id": 11 },
        { "url": c12, "des": '三月春风&惊蛰', "id": 12 },
        { "url": c13, "des": '四月谷雨&清明', "id": 13 },
        { "url": c14, "des": '五月立夏&小满', "id": 14 },
        { "url": c15, "des": '六月芒种&夏至', "id": 15 },
        { "url": c16, "des": '七月小暑&大暑', "id": 16 },
        { "url": c17, "des": '八月立秋&处暑', "id": 17 },
        { "url": c18, "des": '九月白露&秋分', "id": 18 },
        { "url": c19, "des": '十月寒露&霜降', "id": 19 },
        { "url": c20, "des": '十一月立冬&小雪', "id": 20 },
        { "url": c21, "des": '十二月冬至&大雪', "id": 21 },
        { "url": c22, "des": '拌面', "id": 22 },
        { "url": c23, "des": '蜂蜜厚多士', "id": 23 },
        { "url": c24, "des": '曲奇', "id": 24 },
        { "url": c25, "des": '石锅拌饭', "id": 25 },
        { "url": c26, "des": '沙拉', "id": 26 },
    )

    function comdet(e: any) {
        if (e.target.alt) {
            navigate({ pathname: `comicdetails/${e.target.alt}` })
        }
        if (e.target.innerHTML) {
            navigate({ pathname: `comicdetails/${e.target.dataset.id}` })
        }
    }


    function xxx() {

        return imgbox.map((item: any, index: any) => {
            return (
                <div key={index} className={cm.imgbox} onClick={comdet}>
                    <img src={item.url} alt={item.id} />
                    <div data-id={item.id}>{item.des}</div>
                </div>
            )
        })

    }
    return (
        <>
            <Header></Header>
            <div className={cm.dmbx}>
                <div>
                    {xxx()}
                </div>
                <div>
                    <div style={{ marginBottom: "10px" }}>小游戏</div>
                    <div style={{ marginBottom: "10px" }}>
                        <a href="http://www.4399.com/flash/1923.htm#search3">厨房连连看</a>
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <a href="http://www.4399.com/flash/120890.htm#search3">
                            可爱宝贝爱厨房
                        </a>
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <a href="http://www.4399.com/flash/60015.htm#search3">
                        厨房清理
                        </a>    
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}