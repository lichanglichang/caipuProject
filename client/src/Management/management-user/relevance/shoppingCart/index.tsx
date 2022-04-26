import { Button, Divider, message, Popconfirm, Space, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BaseCard from "../../../components/base-card";

const ShoppingCart = () => {
  const { username } = useParams();
  const [count, setCount] = useState<any>();
  // const location = useLocation();
  // console.log(useParams(), location, "路由");

  useEffect(() => {
    axios.get("queryShoppingCart", { params: { username } }).then((res) => {
      console.log(res);
      setCount(res);
    });
  }, [username]);

  // 取消关注
  // const handelCancel = (cancelId: string) => {
  //   axios.post("cancelFollow", { id, cancelId }).then((res) => {
  //     message.success(res.data.msg);
  //     axios.get("queryUserInterest", { params: { id } }).then((res) => {
  //       setCount(res);
  //     });
  //   });
  // };

    // 表格标题数据
  const columns = [
    {
      title: "商品名称",
      dataIndex: "goodsname",
    },
    {
      title: "数量",
      dataIndex: "number",
    },
    {
      title: "单价",
      dataIndex: "total_price",
    },
    {
      title: "总价",
      dataIndex: "unit_price",
    },
    {
      title: "图片",
      dataIndex: "img",
      render: (_: any, record: any) => {
        return (
          <img
            src={`http://localhost:8200/public/shopping/${record.img}`}
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
                // handelCancel(record.id);
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
