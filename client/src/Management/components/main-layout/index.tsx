import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
  ProjectOutlined,
  ScheduleOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Breadcrumb } from "antd";
import { Header, Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import getCookieByKey from "../../../view/getCookie";
import modal from "antd/lib/modal";

interface IProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<IProps> = () => {
  // 路由跳转方法
  const navigate = useNavigate();
  //  获取路由
  const location = useLocation();

  // 展开收起状态
  const [collapsedState, setCollapsedState] = useState(false);

  // 进入界面时，判断是否为登陆转态
  useEffect(() => {
    if (getCookieByKey("msg") === null) {
      modal.confirm({
        title: "未登录，请前往登录！",
        okText: "确认",
        cancelText: "取消",
        onOk: () => {
          navigate({ pathname: "/Login" });
        },
      });
    }
  }, [navigate]);

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

  // 面包屑数据
  const listType = useMemo(() => {
    if (location.pathname.indexOf("/Management/user/base/userUpdate") !== -1) {
      return [
        { name: "用户管理" },
        { name: "基础信息", route: "/Management/user/base" },
        { name: "编辑" },
      ];
    } else if (
      location.pathname.indexOf("/Management/user/relevance/interest") !== -1
    ) {
      return [
        { name: "用户管理" },
        { name: "用户关联", route: "/Management/user/relevance" },
        { name: "关注" },
      ];
    } else if (
      location.pathname.indexOf("/Management/user/relevance/collect") !== -1
    ) {
      return [
        { name: "用户管理" },
        { name: "用户关联", route: "/Management/user/relevance" },
        { name: "收藏" },
      ];
    } else if (
      location.pathname.indexOf("/Management/user/relevance/publish") !== -1
    ) {
      return [
        { name: "用户管理" },
        { name: "用户关联", route: "/Management/user/relevance" },
        { name: "发布" },
      ];
    } else if (
      location.pathname.indexOf("/Management/user/relevance/shoppingCart") !==
      -1
    ) {
      return [
        { name: "用户管理" },
        { name: "用户关联", route: "/Management/user/relevance" },
        { name: "购物车" },
      ];
    } else if (location.pathname.indexOf("/Management/menu/menuAdd") !== -1) {
      return [
        { name: "菜单管理", route: "/Management/menu" },
        { name: "新增" },
      ];
    } else if (
      location.pathname.indexOf("/Management/menu/menuUpdate") !== -1
    ) {
      return [
        { name: "菜单管理", route: "/Management/menu" },
        { name: "编辑" },
      ];
    } else if (location.pathname.indexOf("/Management/user/base") !== -1) {
      return [
        { name: "用户管理" },
        { name: "基础管理", route: "/Management/user/base" },
      ];
    } else if (location.pathname.indexOf("/Management/user/relevance") !== -1) {
      return [
        { name: "用户管理" },
        { name: "用户关联", route: "/Management/user/relevance" },
      ];
    }else if (
      location.pathname.indexOf("/Management/recipe/recipeAdd") !== -1
    ) {
      return [
        { name: "菜谱管理", route: "/Management/recipe" },
        { name: "新增" },
      ];
    } else if (
      location.pathname.indexOf("/Management/recipe/recipeUpdate") !== -1
    ) {
      return [
        { name: "菜谱管理", route: "/Management/recipe" },
        { name: "编辑" },
      ];
    }  else if (location.pathname.indexOf("/Management/node") !== -1) {
      return [{ name: "笔记管理", route: "/Management/node" }];
    } else if (location.pathname.indexOf("/Management/commodity") !== -1) {
      return [{ name: "商品管理", route: "/Management/commodity" }];
    } else if (location.pathname.indexOf("/Management/recipe") !== -1) {
      return [{ name: "菜谱管理", route: "/Management/recipe" }];
    } else if (location.pathname.indexOf("/Management/menu") !== -1) {
      return [{ name: "菜单管理", route: "/Management/menu" }];
    } else {
      return [];
    }
  }, [location]);

  return (
    <Layout style={{ height: "100vh" }}>
      <Header className="header">
        <div className="title">
          <div className="logo">有滋味美食管理系统</div>
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
        <div className="loginStatus">
          <UserOutlined style={{ fontSize: "16px", marginRight: "8px" }} />
          {getCookieByKey("msg") ? "管理员" : "未登录"}
          {getCookieByKey("msg") ? (
            <>
              <div
                className="exit"
                onClick={() => {
                  exitLogin();
                }}
              >
                <span>退出登录</span>
              </div>
              <div className="triangle" />
            </>
          ) : (
            <>
              <div
                className="exit"
                onClick={() => {
                  navigate({ pathname: "/Login" }); 
                }}
              >
                前往登录
              </div>
              <div className="triangle" />
            </>
          )}
        </div>
      </Header>
      <Layout style={{ flexDirection: "row" }}>
        <Sider trigger={null} collapsible collapsed={collapsedState}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultOpenKeys={["user"]}
            selectedKeys={[`${location.pathname}`]}
            style={{ marginTop: "0" }}
          >
            <Menu.SubMenu
              title="用户管理"
              icon={<UserOutlined />}
              key="user"
              className={collapsedState ? "menuArrow" : "menuPadding"}
              style={{ paddingLeft: collapsedState ? "10px" : "" }}
            >
              <Menu.Item
                key={
                  location.pathname.indexOf("/Management/user/base") !== -1
                    ? location.pathname
                    : "/Management/user/base"
                }
              >
                <Link to="/Management/user/base">基础信息</Link>
              </Menu.Item>
              <Menu.Item
                key={
                  location.pathname.indexOf("/Management/user/relevance") !== -1
                    ? location.pathname
                    : "/Management/user/relevance"
                }
              >
                <Link to="/Management/user/relevance">用户关联</Link>
              </Menu.Item>
            </Menu.SubMenu>

            <Menu.Item
              key={ location.pathname.indexOf("/Management/menu") !== -1
              ? location.pathname
              : "/Management/menu"}
              icon={<ProfileOutlined />}
              className={collapsedState ? "menuItem" : ""}
              style={{ paddingLeft: collapsedState ? "34px" : "" }}
            >
              <Link to="/Management/menu">菜单管理</Link>
            </Menu.Item>
            <Menu.Item
               key={ location.pathname.indexOf("/Management/recipe") !== -1
               ? location.pathname
               : "/Management/recipe"}
              icon={<ProjectOutlined />}
              className={collapsedState ? "menuItem" : ""}
              style={{ paddingLeft: collapsedState ? "34px" : "" }}
            >
              <Link to="/Management/recipe">菜谱管理</Link>
            </Menu.Item>
            <Menu.Item
             key={ location.pathname.indexOf("/Management/node") !== -1
             ? location.pathname
             : "/Management/node"}
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
        <Layout style={{ padding: "0 24px 24px", position: "relative" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            {listType.map((item, index) => (
              <Breadcrumb.Item key={index}>
                <Link to={item.route || ""}>{item.name}</Link>
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              margin: 0,
              minHeight: 280,
              overflow: "auto",
            }}
          >
            {getCookieByKey("msg") ? <Outlet /> : ""}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
