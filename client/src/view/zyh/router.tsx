import react from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";

import Main from "./main";
import Laboratory from "./laboratory";
import Textjf from "./testjf";
import Texthc from "./testhc";
import Cesijf from "./cesijf";
import Search from "./search";
import Shopping from "../Qing/shopping";
import Detail from "../Qing/detail";
import Zjy from "../zjy/Zjy";
import Menu from "../cxj/menu_container";
import Recipedes from "../cxj/recipedes";
import Releaser from "../cxj/releaser";
import Menusdes from "../cxj/menusdes";
import Comic from "./comic";
import Comicdetails from "./comicdetails";
import Uploadcaidan from "./uploadcaidan";
import Notes from "../bx/Notes";
import NotesDetails from "../bx/NotesDetails";
import CreateNote from "../bx/CreateNote";

import LoginDome from "../LC/login";
import Updatainfo from "../LC/Updatainfo";
import CollectDemo from "../LC/collect";
import TeContent from "../LC/content";

// 管理员路由
import ManagementUser from "../../Management/management-user/index";

import PersonalNote from "../bx/PersonalNote";
import ManagementCommodity from "../../Management/management-commodity";
import ManagementMenu from "../../Management/management-menu";
import ManagementNode from "../../Management/management-node";
import ManagementRecipe from "../../Management/management-recipe";
import ManageMain from "../../Management/ManageMain";

export default function Rte() {
  const [state3, setstate3] = react.useState<any>();
  return (
    <>
      <TeContent.Provider value={{state3, setstate3}}>
        <Router>
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

            {/* 管理员界面*/}
            <Route path="/Management/user" element={<ManagementUser />}></Route>
            <Route path="/Management" element={<ManageMain />}></Route>
            <Route
              path="/Management/commodity"
              element={<ManagementCommodity />}
            ></Route>
            <Route path="/Management/menu" element={<ManagementMenu />}></Route>
            <Route path="/Management/node" element={<ManagementNode />}></Route>
            <Route
              path="/Management/recipe"
              element={<ManagementRecipe />}
            ></Route>
          </Routes>
        </Router>
      </TeContent.Provider>
    </>
  );
}
