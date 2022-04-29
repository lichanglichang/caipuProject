import {
  Button,
  Divider,
  Space,
  Table,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BaseCard from "../../components/base-card";
import { useNavigate } from "react-router-dom";
import Filter from "./components/filter";

export interface Params {
  username: string;
  nickname: string;
  userStatus: string;
}

const UserRelevance: React.FC = () => {
  let navigate = useNavigate();

  //保存用户信息
  const [userList, setUserList] = useState<any>([]);

  //获取用户信息
  useEffect(() => {
    axios.get("/getUser").then((res: any) => {
      setUserList(res.data.data);
    });
  }, [navigate]);

  // 模糊查询用户
  function handleSearchUser(params: Params) {
    axios
      .get("/getUser", {
        params,
      })
      .then((res: any) => {
        setUserList(res.data.data);
      });
  }

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
      title: "操作",
      dataIndex: "url",
      render: (_: any, record: any) => {
        return (
          <Space split={<Divider type="vertical" />}>
            <Button type="link" style={{ padding: "0" }} onClick={()=>{navigate(`/Management/user/relevance/interest/${record.id}`)}}>
              关注
            </Button>
            <Button type="link" style={{ padding: "0" }} onClick={()=>{navigate(`/Management/user/relevance/shoppingCart/${record.username}`)}}>
              购物车
            </Button>
            <Button type="link" style={{ padding: "0" }} onClick={()=>{navigate(`/Management/user/relevance/collect/${record.id}`)}}>
              收藏
            </Button>
            <Button type="link" style={{ padding: "0" }} onClick={()=>{navigate(`/Management/user/relevance/publish/${record.username}`)}}>
              发布
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <BaseCard marginBottom="16px">
        <Filter handleSearch={handleSearchUser} />
      </BaseCard>
      <BaseCard>
        <Table
          dataSource={userList}
          columns={columns}
          pagination={{
            pageSize: 5,
            total: userList.length,
          }}
          bordered={true}
          rowKey={(record) => record.id}
        />
      </BaseCard>
    </>
  );
};
export default UserRelevance;
