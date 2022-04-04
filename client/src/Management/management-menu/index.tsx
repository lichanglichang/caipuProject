import { Space, Button, Table, Divider, message, Popconfirm } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import BaseCard from "../components/base-card";
import Filter from "./filter/index";

export interface Params {
  username: string;
  menuname: string;
}

const ManagementMenu: React.FC = () => {
  const navigate = useNavigate();
  
// 获取菜单信息
  const [menuList, setMenuList] = useState<any>([]);

  useEffect(() => {
    axios
      .get("/getAllMenu", {
        params: {
          username: "",
          menuname: "",
          nickname: "",
        },
      })
      .then((res: any) => {
        setMenuList(res.data.data);
      });
  }, []);

  // 模糊查询菜单
  function getAllMenu(params: Params) {
    axios
      .get("/getAllMenu", {
        params,
      })
      .then((res: any) => {
        setMenuList(res.data.data);
      });
  }

  // 删除菜单
  const deleteMenu = (id: string | number) => {
    axios.get("delMenu", { params: { id } }).then((res)=>{
      if(res.data.code===0){
        message.success("删除成功！")
        axios
        .get("/getAllMenu", {
          params: {
            username: "",
            menuname: "",
            nickname: "",
          },
        })
        .then((res: any) => {
          setMenuList(res.data.data);
        });
      }
    });
  };

  //   表格标题数据
  const columns = [
    {
      title: "菜单名",
      dataIndex: "menuname",
    },
    {
      title: "作者",
      dataIndex: "nickname",
    },
    {
      title: "账号",
      dataIndex: "username",
    },
    {
      title: "简介",
      dataIndex: "introduction",
      ellipsis: true,
    },
    {
      title: "封面图",
      dataIndex: "background",
      width: 100,
      render: (_: any, record: any) => {
        return (
          <img
            src={record.background}
            alt=""
            style={{ width: "100%", height: "50px" }}
          />
        );
      },
    },
    {
      title: "操作",
      dataIndex: "url",
      render: (_: any, record: any) => {
        return (
          <Space split={<Divider type="vertical" />}>
            <Button
              type="link"
              style={{ padding: "0" }}
              onClick={() => {
                navigate(`menuUpdate/${record.menuid}`);
              }}
            >
              编辑
            </Button>
            <Popconfirm
              title="是否确认删除该菜单"
              okText="确认"
              cancelText="取消"
              onConfirm={() => {
                deleteMenu(record.menuid);
              }}
            >
              <Button type="link" style={{ padding: "0" }}>
                删除
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <BaseCard marginBottom={"16px"}>
        <Filter getAllMenu={getAllMenu} />
      </BaseCard>
      <BaseCard>
        <Button
          type="primary"
          style={{ marginBottom: "20px" }}
          onClick={() => {
            navigate("menuAdd");
          }}
        >
          新增
        </Button>
        <Table
          dataSource={menuList}
          columns={columns}
          pagination={{
            pageSize: 5,
            total: menuList.length,
          }}
          bordered={true}
          rowKey={(record) => record.id}
        />
      </BaseCard>
    </>
  );
};

export default ManagementMenu;
