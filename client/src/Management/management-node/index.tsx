import {Space, Button, Table, Divider} from "antd";
import axios from "axios";
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import BaseCard from "../components/base-card";
import Filter, { notesType } from "./filter";

const ManagementNode: React.FC = () => {
  const navigate = useNavigate();
  //获取用户信息
  const [userList, setuserList] = useState<any>([]);
  useEffect(() => {
    axios
      .get("/getAllNotes")
      .then((res: any) => {
        console.log(res.data);

        setuserList(res.data);
      });
  }, []);

  function getNotes(params: notesType) {
    axios
      .get("/getAllNotes", {
        params,
      })
      .then((res: any) => {
        setuserList(res.data);
      });
  }


  //   表格标题数据
  const columns = [
    {
      title: "笔记名",
      dataIndex: "title",
      ellipsis: true,
    },
    {
      title: "作者",
      dataIndex: "username",
     
    },
    {
      title: "账号",
      dataIndex: "account",
     
    },
    {
      title: "内容",
      dataIndex: "content",
      ellipsis: true,
    },
    {
      title: "封面图",
      dataIndex: "userpic",
      render: (_: any, record: any) => {
        return (
          <img
            src={record.userpic}
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
          <Space split={<Divider type="vertical" />}>
            <Button type="link" style={{padding:"0"}} onClick={()=>{  navigate(`notesUpdate/${record.id}`);}}>编辑</Button>
            <Button type="link" style={{padding:"0"}}>删除</Button>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <BaseCard marginBottom={"16px"}>
        <Filter getNotes={getNotes} />
      </BaseCard>
      <BaseCard>
      <Button type="primary" style={{marginBottom:"20px"}} onClick={()=>{  navigate("notesAdd");}}>新增</Button>
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
export default ManagementNode;
