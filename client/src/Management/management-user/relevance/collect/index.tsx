import { Button, Divider, message, Popconfirm, Space, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BaseCard from "../../../components/base-card";

const Collect = () => {
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
      title: "账号",
      dataIndex: "username",
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
                取消关注
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <BaseCard marginBottom="24px">
        <h3 style={{ marginBottom: "24px" }}>
          已收藏菜单（{count?.data.length || 0}）
        </h3>
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
      <BaseCard marginBottom="24px">
        <h3 style={{ marginBottom: "24px" }}>
          已收藏菜谱（{count?.data.length || 0}）
        </h3>
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
      <BaseCard marginBottom="24px">
        <h3 style={{ marginBottom: "24px" }}>
          已收藏笔记（{count?.data.length || 0}）
        </h3>
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

export default Collect;
