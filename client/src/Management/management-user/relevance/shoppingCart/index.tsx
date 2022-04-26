import { Button, Divider, message, Popconfirm, Space, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BaseCard from "../../../components/base-card";

const ShoppingCart = () => {
  const { id } = useParams();
  const [count, setCount] = useState<any>();

  useEffect(() => {
    axios.get("queryUserInterest", { params: { id } }).then((res) => {
      setCount(res);
    });
  }, [id]);

  // 取消关注
  const handelCancel = (cancelId: string) => {
    axios.post("cancelFollow", { id, cancelId }).then((res) => {
      message.success(res.data.msg);
      axios.get("queryUserInterest", { params: { id } }).then((res) => {
        setCount(res);
      });
    });
  };

  //   表格标题数据
  const columns = [
    {
      title: "商品名称",
      dataIndex: "username",
    },
    {
      title: "数量",
      dataIndex: "nickname",
    },
    {
      title: "单价",
      dataIndex: "nickname",
    },
    {
      title: "总价",
      dataIndex: "nickname",
    },
    {
      title: "图片",
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
      dataIndex: "",
      render: (_: any, record: any) => {
        return (
          <Space split={<Divider type="vertical" />}>
            <Popconfirm
              title="是否取消关注该用户？"
              okText="确认"
              cancelText="取消"
              onConfirm={() => {
                handelCancel(record.id);
              }}
            >
              <Button type="link" style={{ padding: "0" }}>
                移除
              </Button>
            </Popconfirm>
            <Button type="link" style={{ padding: "0" }}>
              修改数量
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <BaseCard marginBottom="12px">
        <h3 style={{ marginBottom: "24px" }}>
          购物车（{count?.data.length || 0}）
        </h3>
      </BaseCard>
      <BaseCard>
        <Table
          dataSource={count?.data}
          columns={columns}
          pagination={{
            pageSize: 5,
            total: count?.data.length,
          }}
          bordered={true}
          rowKey={(record) => record.id}
        />
      </BaseCard>
    </>
  );
};

export default ShoppingCart;
