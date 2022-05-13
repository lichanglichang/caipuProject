import { Button, Divider, message, Popconfirm, Space, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BaseCard from "../../components/base-card";


const CommentTow = () => {
  const { id } = useParams();
  const [count, setCount] = useState<any>();

  useEffect(() => {
    axios
    .get("showCom", { params: { type:"1",articel_id:id } })
    .then(function (res: any) {
      console.log(res.data);
      setCount(res)
    });
  }, [id]);

    // 删除评论
    const handelDelete = (id: string) => {
      axios.get("getDel", { params: { id } }).then((res) => {
        message.success(res.data.msg);
        axios
          .get("showCom", { params: { type: "0", articel_id: id } })
          .then(function (res: any) {
            setCount(res);
          });
      });
    };

  //   表格标题数据
  const columns = [
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
        title: "内容",
        dataIndex: "comments",
      },
      {
        title: "操作",
        dataIndex: "url",
        render: (_: any, record: any) => {
          return (
            <Space split={<Divider type="vertical" />}>
            
              <Popconfirm
                title="是否确认删除该评论"
                okText="确认"
                cancelText="取消"
                onConfirm={() => {
                  handelDelete(record.id);
                }}
              >
                <Button type="link" danger style={{ padding: "0" }}>
                  删除评论
                </Button>
              </Popconfirm>
            </Space>
          );
        },
      },
  ];

  return (
    <>
      <BaseCard marginBottom="12px">
        <h3 style={{ marginBottom: "24px" }}>
          评论条数（{count?.data.length || 0}）
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

export default CommentTow;
