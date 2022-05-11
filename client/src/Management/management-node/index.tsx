import {Space, Button, Table, Divider, Popconfirm, message} from "antd";
import axios from "axios";
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import BaseCard from "../components/base-card";
import Filter, { notesType } from "./filter";

const ManagementNode: React.FC = () => {
  const navigate = useNavigate();

  //获取用户信息
  const [userList, setUserList] = useState<any>([]);
  useEffect(() => {
    axios
      .get("/getAllNotes")
      .then((res: any) => {
        setUserList(res.data);
      });
  }, []);

  // 删除笔记
const deleteRecipe=(id:string|number)=>{
  axios.post("delNotes",{id}).then(res=>{
    message.success(res.data.message)
    axios
    .get("/getAllNotes")
    .then((res: any) => {
      setUserList(res.data);
    });
  })
}

  function getNotes(params: notesType) {
    axios
      .get("/getAllNotes", {
        params,
      })
      .then((res: any) => {
        setUserList(res.data);
      });
  }


  //   表格标题数据
  const columns = [
    {
      title: "笔记名",
      dataIndex: "title",
      // ellipsis: true,
    },
    {
      title: "作者",
      dataIndex: "username",
     
    },
    {
      title: "账号",
      dataIndex: "account",
     
    },
    // {
    //   title: "内容",
    //   dataIndex: "content",
    //   ellipsis: true,
    // },
    {
      title: "封面图",
      dataIndex: "picture",
      render: (_: any, record: any) => {
        console.log(record);
        
        return (
          <img
            src={JSON.parse(record.picture)[0]}
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
            <Button type="link" style={{padding:"0"}}>评论</Button>
            <Popconfirm
              title="是否确认删除该笔记"
              okText="确认"
              cancelText="取消"
              onConfirm={() => {
                deleteRecipe(record.id);
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
        <Filter getNotes={getNotes} />
      </BaseCard>
      <BaseCard>
      <Button type="primary" style={{marginBottom:"20px"}} onClick={()=>{navigate("notesAdd")}}>新增</Button>
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
export default ManagementNode;
