import react, {useState, useEffect} from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import zy from "../img/zy.jpg";
import {RightOutlined} from "@ant-design/icons";
import ma from "./css/main.module.css";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
export default function Main() {
  const [rec, Setrec] = useState<any>();
  const [not, Setnot] = useState<any>();
  const [god, Setgod] = useState<any>();
  useEffect(() => {
    showdata();
  }, []);
  let navigate = useNavigate();
  // 初始化数据
  function showdata() {
    axios.get("/getRecipe").then(res => {
      // console.log(res.data);
      Setrec(res.data);
    });
    axios.get("/getNotes").then(res => {
      // console.log(res.data);
      Setnot(res.data);
    });
    axios.get("/getShop").then(res => {
      // console.log(res.data);
      Setgod(res.data);
    });
  }
  //展示菜谱
  function zccp() {
    if (rec) {
      return rec.map((item: any) => {
        return (
          <div key={item.id} onClick={tzcp}>
            <div>
              <img src={"http://localhost:8200" + item.img} alt={item.id} />
            </div>
            <div data-id={item.id} style={{marginTop: "10px"}}>
              {item.menu_name}
            </div>
            <div>by {item.nickname}</div>
          </div>
        );
      });
    }
  }
  //跳转菜谱详情
  function tzcp(e: any) {
    if (e.target.dataset.id) {
      navigate({pathname: `/Recipedes/${e.target.dataset.id}`});
    }
    if (e.target.alt) {
      navigate({pathname: `/Recipedes/${e.target.alt}`});
    }
  }
  //展示笔记
  function zcbj() {
    if (not) {
      return not.map((item: any) => {
        return (
          <div key={item.id} onClick={tzbj}>
            <div>
              <img
                src={JSON.parse(item.picture)[0]}
                alt={item.id}
                className={ma.bjtp}
              />
            </div>
            <div>
              <div
                data-id={item.id}
                className={ma.bjbt}
                style={{margin: "5px 0"}}
              >
                {item.title}
              </div>
              <div>
                <img className={ma.notyh} src={item.userpic} alt="" />
                {item.username}
              </div>
            </div>
          </div>
        );
      });
    }
  }
  //跳转笔记
  function tzbj(e: any) {
    if (e.target.dataset.id) {
      navigate({pathname: `/Notes/Details/${e.target.dataset.id}`});
    }
    if (e.target.alt) {
      navigate({pathname: `/Notes/Details/${e.target.alt}`});
    }
  }

  //展示商城
  function zcsc() {
    if (god) {
      return god.map((item: any) => {
        return (
          <div key={item.id} onClick={tzsc}>
            <div>
              <img
                className={ma.sptp}
                src={ item.picture}
                alt={item.id}
              />
            </div>
            <div>
              <div className={ma.spbt} data-id={item.id}>
                {item.goodsname}
              </div>
              <div>销售量：{item.sales}</div>
            </div>
          </div>
        );
      });
    }
  }
  //跳转商城
  function tzsc(e: any) {
    if (e.target.dataset.id) {
      navigate({pathname: `/detail/${e.target.dataset.id}`});
    }
    if (e.target.alt) {
      navigate({pathname: `/detail/${e.target.alt}`});
    }
  }
  //跳转动漫
  function tzdmdet(e: any) {
    if (e.target.dataset.id) {
      navigate({pathname: `comic/comicdetails/${e.target.dataset.id}`});
    }
  }
  function tzssc(e: any) {
    if (e.target.innerHTML != "新型肺炎实时疫情追踪") {
      navigate({pathname: `/search/${e.target.innerHTML}`});
    }
  }
  return (
    <>
      <Header></Header>
      <div>
        <img className={ma.zytp} src={zy} alt="" />
      </div>
      <div className={ma.bx}>
        <div>
          <div className={ma.mrcp}>
            <span>每日精选菜谱</span>
            <span>
              <Link to={{pathname: "/Menu"}}>
                更多
                <RightOutlined />
              </Link>
            </span>
          </div>
          <div className={ma.cpbox}>{zccp()}</div>
        </div>
        <div>
          <div className={ma.mrcp}>
            <span>笔记</span>
            <span>
              <Link to={{pathname: "/Notes"}}>
                更多
                <RightOutlined />
              </Link>
            </span>
          </div>
          <div className={ma.notbox}>{zcbj()}</div>
        </div>

        <div style={{display: "flex"}}>
          <div className={ma.scjx}>
            <div>
              <span>商城精选</span>
              <span className={ma.xxxxx}>
                <Link to={{pathname: "/shop"}}>
                  更多
                  <RightOutlined />
                </Link>
              </span>
            </div>
            <div className={ma.scbox}>{zcsc()}</div>
          </div>
          <div className={ma.syny}>
            <div>有滋味实验室</div>
            <ul>
              <li>
                <Link to={{pathname: "/Laboratory"}}>智能找菜</Link>
              </li>
              <li>
                <Link to={{pathname: "/Laboratory"}}>有滋味测试题</Link>
              </li>
              <li>
                <Link to={{pathname: "/Laboratory"}}>药品</Link>
              </li>
            </ul>
            <div>动漫</div>
            <ul onClick={tzdmdet} className={ma.ulhover}>
              <li data-id="6">午饭的诱惑</li>
              <li data-id="5">暖暖的晚餐</li>
              <li data-id="4">汤圆-夜宵</li>
              <li data-id="3">好吃的面</li>
              <li data-id="2">绿色的早餐</li>
              <li data-id="23">蜂蜜厚多士</li>
            </ul>
          </div>
        </div>
        <div className={ma.djdzs}>
          <div>大家都在搜</div>
          <div className={ma.sslz} onClick={tzssc}>
            <div>
              <a href="https://www.360kuai.com/mob/subject/400?sign=ex_28e676e3">
                新型肺炎实时疫情追踪
              </a>
            </div>
            <div>肉食</div>
            <div>主食</div>
            <div>烘培</div>
            <div>素食</div>
            <div>小吃</div>
            <div>凉菜</div>
            <div>早餐</div>
            <div>红烧肉</div>
            <div>可乐鸡翅</div>
            <div>红烧茄子</div>
            <div>南瓜饼</div>
            <div>酸菜鱼</div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
