import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
  ProjectOutlined,
  ScheduleOutlined,
  ProfileOutlined,
  UserOutlined

} from "@ant-design/icons";
import { Layout, Menu, Breadcrumb, Button } from "antd";
import { Header, Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import React, { useCallback, useState } from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import getCookieByKey from "../../../view/getCookie";

interface IProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<IProps> = ({ children }) => {
  // 路由跳转方法
  const navigate = useNavigate();
  //  获取路由
  const location = useLocation();
  // 展开收起状态
  const [collapsedState, setCollapsedState] = useState(false);

  // 进入界面时，判断是否为登陆转态
  if (getCookieByKey("msg") === null) {
    navigate({ pathname: "/Login" });
  }

  // 清楚cookie
  function clearAllCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
      for (var i = keys.length; i--; )
        document.cookie = keys[i] + "=0;expires=" + new Date(0).toUTCString();
    }
  }

  // 退出登录
  const exitLogin = useCallback(() => {
    clearAllCookie();
    navigate({ pathname: "/Login" });
  }, [navigate]);

  return (
    <Layout style={{ height: "100vh" }}>
      <Header className="header">
        <div className="title">
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
        </div>
        <Button
          onClick={() => {
            exitLogin();
          }}
        >
          退出登录
        </Button>
      </Header>
      <Layout style={{ flexDirection: "row" }}>
        <Sider trigger={null} collapsible collapsed={collapsedState}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[`${location.pathname}`]}
            // openKeys={["user"]}
            style={{ marginTop: "0" }}
          >
            <Menu.Item
              key="/Management/user"
              icon={  <UserOutlined />}
              className={collapsedState ? "menuItem" : ""}
              style={{ paddingLeft: collapsedState ? "34px" : "" }}
              onClick={() => {
                console.log("caidan");
              }}
            >
              <Link to="/Management/user">用户管理</Link>
            </Menu.Item>
            <Menu.Item
              key="/Management/menu"
              icon={<ProfileOutlined />}
              className={collapsedState ? "menuItem" : ""}
              style={{ paddingLeft: collapsedState ? "34px" : "" }}
            >
              <Link to="/Management/menu">菜单管理</Link>
            </Menu.Item>
            <Menu.Item
              key="/Management/recipe"
              icon={<ProjectOutlined />}
              className={collapsedState ? "menuItem" : ""}
              style={{ paddingLeft: collapsedState ? "34px" : "" }}
            >
              <Link to="/Management/recipe">菜谱管理</Link>
            </Menu.Item>
            <Menu.Item
              key="/Management/node"
              icon={<ScheduleOutlined />}
              className={collapsedState ? "menuItem" : ""}
              style={{ paddingLeft: collapsedState ? "34px" : "" }}
            >
              <Link to="/Management/node">笔记管理</Link>
            </Menu.Item>
            <Menu.Item
              key="/Management/commodity"
              icon={<ShopOutlined />}
              className={collapsedState ? "menuItem" : ""}
              style={{ paddingLeft: collapsedState ? "34px" : "" }}
            >
              <Link to="/Management/commodity">商品管理</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>用户管理</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              margin: 0,
              minHeight: 280,
              overflow: "auto",
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
