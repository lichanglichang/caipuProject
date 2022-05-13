import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "../view/zestful/zestful";//首页
import GoodsLists from "../view/shopModule/goodsLists";//商城
import GoodsDetail from "../view/shopModule/goodsDetail";//商城-商品详情
import NoteLists from "../view/notesModule/noteLists";//笔记
import NotesDetails from "../view/notesModule/NotesDetails";//笔记-笔记详情
import Comic from "../view/cartoonModule/comic";//漫画
import Comicdetails from "../view/cartoonModule/comicdetails";//漫画-漫画详情
import Laboratory from "../view/gameModule/laboratory";//互动问答
import GameBegin from "../view/gameModule/gameBegin";//互动问答-游戏开始
import Tests from "../view/gameModule/tests";//互动问答-游戏开始-测试题
import Menu from "../view/recipeMenuModule/menuTotal";//菜谱菜单
import Recipedetails from "../view/recipeMenuModule/recipedetails";//菜谱菜单-菜谱详情
import MenuDetails from "../view/recipeMenuModule/menuDetails";//菜谱菜单-菜单详情
import Search from "../view/searchModule/search";//搜索
import ReleaseMenu from "../view/releaseModule/releaseMenu";//发布-发布菜单
import ReleaseRecipe from "../view/releaseModule/releaseRecipe";//发布-发布菜谱
import ReleaseNote from "../view/releaseModule/releaseNote";//发布-发布笔记
import Login from "../view/loginModule/login";//登录
import Updatainfo from "../view/personalModule/Updatainfo";//修改个人信息
import CollectDemo from "../view/personalModule/collect";//个人中心
import PersonalNote from "../view/personalModule/PersonalNote";//个人中心-笔记

import Zjy from "../view/zjy/Zjy";

export default function Rte() {
  return (
    <>
      {/* <Router> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<GoodsLists />} />
          <Route path="/detail/:id" element={<GoodsDetail />} />
          <Route path="/Notes" element={<NoteLists />}></Route>
          <Route path="/Notes/Details/:id" element={<NotesDetails />}></Route>
          <Route path="/Laboratory/textjf" element={<GameBegin />} />
          <Route path="/Laboratory/textjf/cesijf" element={<Tests />} />
          <Route path="/Laboratory" element={<Laboratory />} />
          <Route path="/comic" element={<Comic />} />
          <Route path="/comic/comicdetails/:cid" element={<Comicdetails />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/Recipedes/:showsid" element={<Recipedetails />} />
          <Route path="/Menusdes/:menusid" element={<MenuDetails />} />
          <Route path="/search/:kw" element={<Search />} />
          <Route path="/Releaser" element={<ReleaseRecipe />} />
          <Route path="/Create/Note" element={<ReleaseNote />}></Route>
          <Route path="/uploadcaidan" element={<ReleaseMenu />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/collect/PersonalNote" element={<PersonalNote />}></Route>
          <Route path="/updatainfo" element={<Updatainfo />} />
          <Route path="/collect" element={<CollectDemo />} />
        
          <Route path="/Zjy" element={<Zjy />} />
          
        
        </Routes>
      {/* </Router> */}
    </>
  );
}
