import {Button, Space, Table} from "antd";
import axios from "axios";
import React, {useEffect, useState} from "react";
import ManageMainComponent from "../components/main-layout";
import BaseCard from "../components/base-card";
import Filter from "./components/filter";

export interface Params {
  num: number;
  kw: string;
}

const ManagementUser: React.FC = () => {
  //获取用户信息
  const [userList, setuserList] = useState<any>([]);
  useEffect(() => {
    axios
      .get("/getAllUser", {
        params: {
          num: 1,
          kw: "",
        },
      })
      .then((res: any) => {
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
      title: "账号",
      dataIndex: "username",
    },
    {
      title: "密码",
      dataIndex: "password",
    },
    {
      title: "昵称",
      dataIndex: "nickname",
    },
    {
      title: "头像",
      dataIndex: "url",
      render: (_: any, record: any) => {
        return (
          <img
            src={record.url}
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
          <Space>
            <Button type="primary">编辑</Button>
            <Button>删除</Button>
          </Space>
        );
      },
    },
  ];

  return (
    <ManageMainComponent>
      <BaseCard marginBottom={"16px"}>
        <Filter handleSearch={getAllUser} />
      </BaseCard>
      <BaseCard>
        <Table
          dataSource={userList}
          columns={columns}
          pagination={{
            pageSize: 3,
            total: 5,
          }}
          bordered={true}
        />
      </BaseCard>
    </ManageMainComponent>
  );
};
export default ManagementUser;
