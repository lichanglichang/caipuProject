import { Button, Space, Table } from "antd";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import ManageMainComponent from "../components/main-layout";
import BaseCard from "../components/base-card";
import Filter from "./components/filter";
import { useNavigate } from "react-router-dom";
import getCookieByKey from "../../view/getCookie";

export interface Params {
  num: number;
  kw: string;
}

const ManagementUser: React.FC = () => {
  let navigate = useNavigate();
  //获取用户信息
  const [userList, setUserList] = useState<any>([]);





  useEffect(() => {

    axios
      .get("/getAllUser", {
        params: {
          num: 1,
          kw: "",
        },
      })
      .then((res: any) => {
        setUserList(res.data.data);
      });
  }, [ navigate]);

  function getAllUser(params: Params) {
    axios
      .get("/getAllUser", {
        params,
      })
      .then((res: any) => {
        setUserList(res.data.data);
      });
  }

  // 获取指定名称的cookie的值
  function getCookie(objName: string) {
    let arrStr = document.cookie.split("; ");

    for (let i = 0; i < arrStr.length; i++) {
      let temp = arrStr[i].split("=");
      if (temp[0] === objName) return unescape(temp[1]);
    }
  }

  console.log(userList, "kkkk");
  console.log(getCookie("msg"));

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
            style={{ width: "50px", height: "50px" }}
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
