import {Button, Space, Table} from "antd";
import axios from "axios";
import React, {useState} from "react";
import ManageMainComponent from "../components/main-layout";

const ManagementUser: React.FC = () => {
  //获取用户信息
  const [userList, setuserList] = useState<any>([]);
  function getAllUser() {
    axios
      .get("/getAllUser", {
        params: {
          num: 1,
          kw: "",
        },
      })
      .then((res: any) => {
        setuserList(res.data.data);
      });
  }
  const [currentPage, setCurrentPage] = useState<number>(1);
  //   getAllUser();
  console.log(userList);

  //   React.useEffect(getAllUser, [userNum, userKw]);

  //   表格row数据
  const dataSource = userList.slice(currentPage * 0, (currentPage + 1) * 2);

  //   表格标题数据
  const columns = [
    {
      title: "用户名",
      dataIndex: "username",
    },
    {
      title: "密码",
      dataIndex: "password",
    },
    {
      title: "性别",
      dataIndex: "sex",
    },
    {
      title: "头像",
      dataIndex: "url",
      render: (_: any, record: any) => {
        return (
          <img
            src={record.url}
            alt=""
            style={{width: "50px", height: "50px"}}
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
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 2,
          total: 5,
          onChange: (page, tow) => {
            setCurrentPage(page);
          },
        }}
      />
      ;<button onClick={getAllUser}>发起请求</button>
    </ManageMainComponent>
  );
};
export default ManagementUser;
