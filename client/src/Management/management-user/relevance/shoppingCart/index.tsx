import { Button, Divider, Form, Input, InputNumber, message, Modal, Popconfirm, Space, Table } from "antd";
import { useForm } from "antd/lib/form/Form";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BaseCard from "../../../components/base-card";

const ShoppingCart = () => {
  const { username } = useParams();
  const [count, setCount] = useState<any>([]);
  const [form] = useForm();

  // 总价保留两位小数
  const handleNumber = (data: any) => {
    return data.map((item: any) => {
      return { ...item, unit_price: Math.floor(item.unit_price * 100) / 100 };
    });
  };

  useEffect(() => {
    axios.get("queryShoppingCart", { params: { username } }).then((res) => {
      setCount(handleNumber(res.data));
    });
  }, [username]);

  // 删除购物车
  const handleDelete = (id: string) => {
    axios.post("deleteShoppingCart", { id }).then((res) => {
      message.success(res.data.msg);
      axios.get("queryShoppingCart", { params: { username } }).then((res) => {
        setCount(handleNumber(res.data));
      });
    });
  };

  // 弹窗
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 显示弹窗
  const showModal = (record:any) => {
    form.setFieldsValue({number:record.number,id:record.id,total_price:record.total_price});
    setIsModalVisible(true);
  };
  
  // 修改数量
  const handleOk = () => {
    form.validateFields().then((res) => {
      axios.post("/updateNumber", res).then((res) => {
        axios.get("queryShoppingCart", { params: { username } }).then((res) => {
          setCount(handleNumber(res.data));
        });
          setIsModalVisible(false);
          message.success("修改成功！");
      
      });
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


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
            style={{ width: "60px", height: "60px" }}
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
              title="是否移除该商品？"
              okText="确认"
              cancelText="取消"
              onConfirm={() => {
                handleDelete(record.id);
              }}
            >
              <Button type="link" style={{ padding: "0" }}>
                移除
              </Button>
            </Popconfirm>
            <Button type="link" style={{ padding: "0" }} onClick={()=>{showModal(record)}}>
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
        <h3 style={{ marginBottom: "24px" }}>购物车（{count?.length || 0}）</h3>
      </BaseCard>
      <BaseCard>
        <Table
          dataSource={count}
          columns={columns}
          pagination={{
            pageSize: 5,
            total: count?.length,
          }}
          bordered={true}
          rowKey={(record) => record.id}
        />
      </BaseCard>
      <Modal
        title="修改数量"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
      >
        <Form
          name="basic"
          autoComplete="off"
          form={form}
        >
          <Form.Item name="id" hidden />
          <Form.Item name="total_price" hidden />
          <Form.Item
            label="数量"
            name="number"
          >
          <InputNumber min={1} style={{width:"100%"}}/>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ShoppingCart;
