import {Space, Button, Table, Divider} from "antd";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {Params} from "react-router-dom";
import BaseCard from "../components/base-card";
import ManageMainComponent from "../components/main-layout";
import Filter from "./filter";

const ManagementRecipe: React.FC = () => {
  //获取用户信息
  const [userList, setuserList] = useState<any>([]);
  useEffect(() => {
    axios
      .get("/getAllRecipe", {
        params: {
          num: 1,
          kw: "",
        },
      })
      .then((res: any) => {
        console.log(res.data.data);

        setuserList(res.data.data);
      });
  }, []);

  function getAllUser(params: Params) {
    axios
      .get("/getAllUser", {
        params,
      })
      .then((res: any) => {
        setuserList(res.data.data);
      });
  }

  console.log(userList, "kkkk");

  //   表格标题数据
  const columns = [
    {
      title: "菜单名",
      dataIndex: "menu_name",
    },
    {
      title: "作者",
      dataIndex: "nickname",
    },
    {
      title: "简介",
      dataIndex: "introduce",
    },
    {
      title: "封面图",
      dataIndex: "img",
      render: (_: any, record: any) => {
        return (
          <img
            src={record.img}
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
        <Filter />
      </BaseCard>
      <BaseCard>
      <Button type="primary" style={{marginBottom:"20px"}}>新增</Button>
        <Table
          dataSource={userList}
          columns={columns}
          pagination={{
            pageSize: 3,
            total: userList.length,
          }}
          bordered={true}
        />
      </BaseCard>
    </>
  );
};
export default ManagementRecipe;
