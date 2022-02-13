

import react from "react";
import logo from "../img/logo3.png";
import qrcode from "../img/qrcode.png";
import xcx from "../img/xcx.jpg";
import gzh from "../img/gzh.png";
import ft from "./css/footer.module.css"

export default function Footer() {
    return (
        <>
            <div className={ft.f1}>
                <div className={ft.fbx}>
                    <div>
                        <div>
                            <img src={logo} alt="" />
                        </div>
                        <div className={ft.wzsm}>
                            <span className={ft.sp}>500万+</span>美食菜谱；
                            <span className={ft.sp}>2000万+</span>互动内容；
                            <span className={ft.sp}>3000+</span> 美食课堂；
                            <span className={ft.sp}>5000万+</span>用户每天都有新分享    
                        </div>
                    </div>
                    <div style={{marginLeft:'20px'}}>
                        <div style={{marginBottom:'20px'}}>扫二维码，下载豆果手机应用：</div>
                        <div>
                            <img style={{width:'100px',height:'100px',marginRight:'20px'}} src={qrcode} alt="" />
                            <img style={{width:'100px',height:'100px',marginRight:'20px'}} src={xcx} alt="" />
                            <img style={{width:'100px',height:'100px',marginRight:'20px'}} src={gzh} alt="" />
                        </div>
                        <div>
                            <span style={{fontSize:'12px',color: '#999999',marginLeft:'25px',marginRight:'65px'}}>豆果美食</span>
                            <span style={{fontSize:'12px',color: '#999999',marginRight:'60px'}}>微信扫一扫</span>
                            <span style={{fontSize:'12px',color: '#999999'}}>豆果公众号</span>
                        </div>
                    </div>
                </div>
                <div style={{backgroundColor:'white',textAlign:'center',padding:'20px',fontSize:'12px'}}>
                    <div style={{color:'#70543E'}}>关于豆果 · 在豆果工作 · 意见反馈 · 菜谱大全</div>
                    <div>北京豆果信息技术有限公司 京ICP证111032号  京公网安备 11010502038268号 京ICP备09012748号</div>
                    <div>互联网药品信息服务资格证书</div>
                    <div>京网文【2017】6954-770号 食品流通许可证SP1101061510252413</div>
                    <div>广播电视节目制作经营许可证（京）字第11624号</div>
                </div>
            </div>
        </>
    )
}