import React from "react";
import {Menu} from "antd"; 
import "antd/dist/antd.css";
import ThemeContext from "./MyContext";
import {
    
  FileProtectOutlined,
    WalletOutlined,
    TeamOutlined ,
    CalendarOutlined,
    AppstoreOutlined 
} from '@ant-design/icons';
//const { SubMenu } = Menu;
export default function Nav(){
  const obj=React.useContext(ThemeContext);
  
  function check(e:any){
    console.log(e.key)
    obj.dispatch(e.key)
  }
  return (
      <div>
        <Menu
          defaultSelectedKeys={['用户']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          style={{"height":"550px"}}
          onClick={check}

        >
          <Menu.Item key="用户" icon={<TeamOutlined />}>
            用户管理
          </Menu.Item>
          <Menu.Item key="菜谱" icon={<CalendarOutlined />}>
            菜谱管理
          </Menu.Item>
          <Menu.Item key="菜单" icon={<FileProtectOutlined />}>
            菜单管理
          </Menu.Item>
          <Menu.Item key="笔记" icon={<WalletOutlined />}>
            笔记管理
          </Menu.Item>
          <Menu.Item key="商品" icon={<AppstoreOutlined  />}>
            商品管理
          </Menu.Item>

        </Menu>  
      </div>
  )
}
