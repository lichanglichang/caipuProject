import { Space, Button, Table, Divider, Modal, Popconfirm, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseCard from "../components/base-card";
import Filter from "./filter";

const ManagementCommodity: React.FC = () => {
  const navigate = useNavigate();
  //获取用户信息
  const [userList, setuserList] = useState<any>([]);
  useEffect(() => {
    axios.get("getAllGoods").then((res: any) => {
      console.log(res.data);
      
      setuserList(res.data);
    });
  }, []);

  const getCommodity = (params: any) => {
    axios
      .get("/getAllGoods", {
        params,
      })
      .then((res: any) => {
        setuserList(res.data);
      });
  };

    // 删除商品
    const deleteCommodity =(id:number|string)=>{
      axios.post("delGoods",{id}).then(res=>{
        message.success(res.data.message)
        axios
        .get("/getAllGoods")
        .then((res: any) => {
          setuserList(res.data);
        });
      })
    }

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
            src={record.picture}
            alt=""
            style={{ width: "80px", height: "80px" }}
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
            <Button
              type="link"
              style={{ padding: "0" }}
              onClick={() => {
                navigate(`commodityUpdate/${record.id}`);
              }}
            >
              编辑
            </Button>
            <Popconfirm
              title="是否确认删除该菜单"
              okText="确认"
              cancelText="取消"
              onConfirm={() => {
                deleteCommodity(record.id);
              }}
            >
              <Button type="link" danger style={{ padding: "0" }}>
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
        <Filter getCommodity={getCommodity}/>
      </BaseCard>
      <BaseCard>
        <Button
          type="primary"
          style={{ marginBottom: "20px" }}
          onClick={() => {
            navigate("commodityAdd");
          }}
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
    </>
  );
};
export default ManagementCommodity;
