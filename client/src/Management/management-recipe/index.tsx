import { Space, Button, Table, Divider, Popconfirm, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseCard from "../components/base-card";
import Filter, { recipeType } from "./filter";

const ManagementRecipe: React.FC = () => {
  const navigate = useNavigate();

  //获取菜谱信息
  const [recipeList, setRecipeList] = useState<any>([]);

  useEffect(() => {
    axios.get("/getAllRecipe").then((res: any) => {
      setRecipeList(res.data.data);
    });
  }, []);

  // 点击模糊查询
  const getRecipe = (params: recipeType) => {
    axios
      .get("/getAllRecipe", {
        params,
      })
      .then((res: any) => {
        setRecipeList(res.data.data);
      });
  };

  // 删除菜谱
  const deleteRecipe = (id: string | number) => {
    axios.post("delRecipe", { id }).then((res) => {
     message.success(res.data.msg)
     axios.get("/getAllRecipe").then((res: any) => {
      setRecipeList(res.data.data);
    });
    });
  };

  //   表格标题数据
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      width: 50,
    },
    {
      title: "菜谱名",
      dataIndex: "menu_name",
      ellipsis: true,
      with: 100,
    },
    {
      title: "作者",
      dataIndex: "nickname",
    },
    {
      title: "账号",
      dataIndex: "username",
    },
    {
      title: "封面图",
      dataIndex: "img",
      render: (_: any, record: any) => {
        return (
          <img
            src={record.img}
            alt=""
            style={{ width: "80px", height: "50px" }}
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
            <Button
              type="link"
              style={{ padding: "0" }}
              onClick={() => {
                navigate(`recipeUpdate/${record.id}`);
              }}
            >
              编辑
            </Button>
            <Button type="link" style={{ padding: "0" }}>
              评论
            </Button>
            <Popconfirm
              title="是否确认删除该菜谱"
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
        <Filter getRecipe={getRecipe} />
      </BaseCard>
      <BaseCard>
        <Button
          type="primary"
          style={{ marginBottom: "20px" }}
          onClick={() => {
            navigate("recipeAdd");
          }}
        >
          新增
        </Button>
        <Table
          dataSource={recipeList}
          columns={columns}
          pagination={{
            pageSize: 5,
            total: recipeList.length,
          }}
          bordered={true}
        />
      </BaseCard>
    </>
  );
};
export default ManagementRecipe;
