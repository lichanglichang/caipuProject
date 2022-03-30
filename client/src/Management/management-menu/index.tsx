import {Space, Button, Table, Divider} from "antd";
import axios from "axios";
import React, {useEffect, useState} from "react";

import BaseCard from "../components/base-card";
import ManageMainComponent from "../components/main-layout";
import Filter from "./filter/index";

export interface Params{
  username:string,
  menuname:string
}

const ManagementMenu: React.FC = () => {
  //获取用户信息
  const [userList, setuserList] = useState<any>([]);
  useEffect(() => {
    axios
      .get("/getAllMenu", {
        params: {
          username: "",
          menuname: "",
          nickname:""
        },
      })
      .then((res: any) => {
        setuserList(res.data.data);
      });
  }, []);

  function getAllMenu(params: Params) {
    axios
    .get("/getAllMenu", {
      params
    })
    .then((res: any) => {
      setuserList(res.data.data);
    });
  }


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
    },
    {
      title: "封面图",
      dataIndex: "background",
      render: (_: any, record: any) => {
        return (
          <img
            src={record.background}
            alt=""
            style={{width: "50px", height: "50px"}}
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
          <Button type="link" style={{padding:"0"}}>编辑</Button>
          <Button type="link" style={{padding:"0"}}>删除</Button>
        </Space>
        );
      },
    },
  ];

  return (
    <>
      <BaseCard marginBottom={"16px"}>
        <Filter getAllMenu={getAllMenu}/>
      </BaseCard>
      <BaseCard>
      <Button type="primary" style={{marginBottom:"20px"}}>新增</Button>
        <Table
          dataSource={userList}
          columns={columns}
          pagination={{
            pageSize: 5,
            total: userList.length,
          }}
          bordered={true}
          rowKey={(record) => record.id}
        />
      </BaseCard>
    </>
  );
};

export default ManagementMenu;
