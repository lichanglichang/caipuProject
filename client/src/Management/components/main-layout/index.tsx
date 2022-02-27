import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import {Layout, Menu, Breadcrumb} from "antd";
import {Header, Content} from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import React, {useState} from "react";
import "antd/dist/antd.css";
import "./index.css";
import {Link, useLocation} from "react-router-dom";
interface IProps {
  children?: React.ReactNode;
}
const MainLayout: React.FC<IProps> = ({children}) => {
  const [collapsedState, setCollapsedState] = useState(false);
  const location = useLocation();
  return (
    <Layout style={{height: "100vh"}}>
      <Header className="header">
        <div className="logo">豆果美食管理系统</div>
        {React.createElement(
          collapsedState ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: "trigger",
            onClick: () => {
              setCollapsedState(!collapsedState);
            },
          }
        )}
      </Header>
      <Layout style={{flexDirection: "row"}}>
        <Sider trigger={null} collapsible collapsed={collapsedState}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[`${location.pathname}`]}
            style={{marginTop: "0"}}
          >
            <Menu.Item
              key="/Management/user"
              icon={<UserOutlined />}
              className={collapsedState ? "menueItem" : ""}
              style={{paddingLeft: collapsedState ? "34px" : ""}}
              onClick={() => {
                console.log("user");
              }}
            >
              <Link to="/Management/user">用户管理</Link>
            </Menu.Item>
            <Menu.Item
              key="/Management/menu"
              icon={<VideoCameraOutlined />}
              className={collapsedState ? "menueItem" : ""}
              style={{paddingLeft: collapsedState ? "34px" : ""}}
              onClick={() => {
                console.log("caidan");
              }}
            >
              <Link to="/Management/menu">菜单管理</Link>
            </Menu.Item>
            <Menu.Item
              key="/Management/recipe"
              icon={<UploadOutlined />}
              className={collapsedState ? "menueItem" : ""}
              style={{paddingLeft: collapsedState ? "34px" : ""}}
            >
              <Link to="/Management/recipe">菜谱管理</Link>
            </Menu.Item>
            <Menu.Item
              key="/Management/node"
              icon={<UploadOutlined />}
              className={collapsedState ? "menueItem" : ""}
              style={{paddingLeft: collapsedState ? "34px" : ""}}
            >
              <Link to="/Management/node">笔记管理</Link>
            </Menu.Item>
            <Menu.Item
              key="/Management/commodity"
              icon={<UploadOutlined />}
              className={collapsedState ? "menueItem" : ""}
              style={{paddingLeft: collapsedState ? "34px" : ""}}
            >
              <Link to="/Management/commodity">商品管理</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{padding: "0 24px 24px"}}>
          <Breadcrumb style={{margin: "16px 0"}}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
