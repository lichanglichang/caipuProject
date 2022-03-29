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
import ManagementUser from "../Management/management-user/index";
import PersonalNote from "../view/bx/PersonalNote";
import ManagementCommodity from "../Management/management-commodity";
import ManagementMenu from "../Management/management-menu";
import ManagementNode from "../Management/management-node";
import ManagementRecipe from "../Management/management-recipe";
import ManageMain from "../Management/ManageMain";
import UpdateUser from "../Management/management-user/update-user";
import MainLayout from "../Management/components/main-layout";

export default function ManagementRoutes() {
  return (
    <>
      <Router>
        <MainLayout>
          <Routes>
            {/* 管理员界面*/}
            <Route path="/Management/user" element={<ManagementUser />}>
              {/* <Routes> <Route path="/userUpdate" element={<UpdateUser />}></Route></Routes> */}
           
            </Route>
            <Route path="/Management/user/userUpdate" element={<UpdateUser />}></Route>
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
        </MainLayout>
      </Router>
    </>
  );
}
