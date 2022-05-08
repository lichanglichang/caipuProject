import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Main from "../view/zyh/main";
import Laboratory from "../view/zyh/laboratory";
import Textjf from "../view/zyh/testjf";
import Texthc from "../view/zyh/testhc";
import Cesijf from "../view/zyh/cesijf";
import Search from "../view/zyh/search";
import Shopping from "../view/Qing/shopping";
import Detail from "../view/Qing/detail";
import Zjy from "../view/zjy/Zjy";
import Menu from "../view/cxj/menu_container";
import Recipedes from "../view/cxj/recipedes";
import Releaser from "../view/cxj/releaser";
import Menusdes from "../view/cxj/menusdes";
import Comic from "../view/zyh/comic";
import Comicdetails from "../view/zyh/comicdetails";
import Uploadcaidan from "../view/zyh/uploadcaidan";
import Notes from "../view/bx/Notes";
import NotesDetails from "../view/bx/NotesDetails";
import CreateNote from "../view/bx/CreateNote";

import LoginDome from "../view/LC/login";
import Updatainfo from "../view/LC/Updatainfo";
import CollectDemo from "../view/LC/collect";

// 管理员路由

import PersonalNote from "../view/bx/PersonalNote";


export default function Rte() {
  return (
    <>
      {/* <Router> */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/comic" element={<Comic />} />
          <Route path="/comic/comicdetails/:cid" element={<Comicdetails />} />
          <Route path="/search/:kw" element={<Search />} />
          <Route path="/uploadcaidan" element={<Uploadcaidan />} />
          <Route path="/shop" element={<Shopping />} />
          <Route path="/Laboratory" element={<Laboratory />} />
          <Route path="/Laboratory/textjf" element={<Textjf />} />
          <Route path="/Laboratory/texthc" element={<Texthc />} />
          <Route path="/Laboratory/textjf/cesijf" element={<Cesijf />} />
          <Route path="/detail/:id" element={<Detail />} />
          {/* 修改个人信息 */}
          <Route path="/updatainfo" element={<Updatainfo />} />
          {/* 登录注册界面 */}
          <Route path="/Login" element={<LoginDome />} />
          {/* 我的收藏 */}
          <Route path="/collect" element={<CollectDemo />} />
          <Route path="/Zjy" element={<Zjy />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/Recipedes/:showsid" element={<Recipedes />} />
          <Route path="/Releaser" element={<Releaser />} />
          <Route path="/Menusdes/:menusid" element={<Menusdes />} />

          {/* 笔记界面 */}
          <Route path="/Notes" element={<Notes />}></Route>
          <Route path="/Notes/Details/:id" element={<NotesDetails />}></Route>
          <Route path="/Create/Note" element={<CreateNote />}></Route>
          <Route
            path="/collect/PersonalNote"
            element={<PersonalNote />}
          ></Route>
        </Routes>
      {/* </Router> */}
    </>
  );
}
