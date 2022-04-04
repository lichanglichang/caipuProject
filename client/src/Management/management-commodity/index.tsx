import { Space, Button, Table, Divider, Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Params } from "react-router-dom";
import BaseCard from "../components/base-card";
import Filter from "./filter";

const ManagementCommodity: React.FC = () => {
  //获取用户信息
  const [userList, setuserList] = useState<any>([]);
  useEffect(() => {
    axios.get("getAllGoods").then((res: any) => {
      setuserList(res.data);
    });
  }, []);

  function getAllUser(params: Params) {
    axios
      .get("/getAllUser", {
        params,
      })
      .then((res: any) => {
        setuserList(res.data);
      });
  }

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //   表格标题数据
  const columns = [
    {
      title: "商品名",
      dataIndex: "goodsname",
      ellipsis: true,
    },
    {
      title: "商品图",
      dataIndex: "picture",
      render: (_: any, record: any) => {
        return (
          <img
            src={`http://localhost:8200/public/shopping/${record.picture}`}
            alt=""
            style={{ width: "50px", height: "50px" }}
          />
        );
      },
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
          <Space split={<Divider type="vertical" />}>
            <Button type="link" style={{ padding: "0" }}>
              编辑
            </Button>
            <Button type="link" style={{ padding: "0" }}>
              删除
            </Button>
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
        <Button
          type="primary"
          style={{ marginBottom: "20px" }}
          onClick={showModal}
        >
          新增
        </Button>
        <Table
          dataSource={userList}
          columns={columns}
          pagination={{
            pageSize: 5,
            total: userList.length,
          }}
          bordered={true}
        />
      </BaseCard>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};
export default ManagementCommodity;
