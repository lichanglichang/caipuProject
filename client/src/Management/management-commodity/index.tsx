import {Space, Button, Table} from "antd";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {Params} from "react-router-dom";
import BaseCard from "../components/base-card";
import ManageMainComponent from "../components/main-layout";
import Filter from "../management-menu/filter";

const ManagementCommodity: React.FC = () => {
  //获取用户信息
  const [userList, setuserList] = useState<any>([]);
  useEffect(() => {
    axios
      .get("/getAllGoods", {
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
      dataIndex: "goodsname",
    },
    {
      title: "发货地",
      dataIndex: "address",
    },
    {
      title: "简介",
      dataIndex: "introduction",
    },
    {
      title: "价格",
      dataIndex: "price",
    },
    {
      title: "操作",
      dataIndex: "_",
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
        <Filter />
      </BaseCard>
      <BaseCard>
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
    </ManageMainComponent>
  );
};
export default ManagementCommodity;
