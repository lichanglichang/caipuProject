import { Button, Divider, message, Popconfirm, Space, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BaseCard from "../../../components/base-card";

const Collect = () => {
  const { id } = useParams();
  // 保存收藏菜谱
  const [recipeList, setRecipeList] = useState<any>([]);
  // 保存收藏菜单
  const [menuList, setMenuList] = useState<any>([]);
  // 保存收藏笔记
  const [notesList, setNotesList] = useState<any>([]);

  useEffect(() => {
    axios.get("queryCollectRecipe", { params: { id } }).then((res) => {
      setRecipeList(res.data);
    });
    axios.get("queryCollectNotes", { params: { id } }).then((res) => {
      setNotesList(res.data);
    });
    axios
      .get("/queryCollectMenu", {
        params: {
          id,
        },
      })
      .then((res: any) => {
        setMenuList(res.data);
      });
  }, [id]);

  // 移除操作
  const handleDelete = (deleteId: string, type: string) => {
    axios.post("deleteCollect" + type, { id, deleteId }).then((res) => {
      message.success(res.data.msg);
      axios
        .get("/queryCollect" + type, {
          params: {
            id,
          },
        })
        .then((res: any) => {
          switch (type) {
            case "Menu":
              setMenuList(res.data);
              break;
            case "Recipe":
              setRecipeList(res.data);
              break;
            case "Notes":
              setNotesList(res.data);
              break;
          }
        });
    });
  };

  //   表格标题数据
  const columnsNotes = [
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
            style={{ width: "50px", height: "50px" }}
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
            <Popconfirm
              title="是否移除该笔记？"
              okText="确认"
              cancelText="取消"
              onConfirm={() => {
                handleDelete(record.id, "Notes");
              }}
            >
              <Button type="link" style={{ padding: "0" }}>
                移除收藏
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  //   表格标题数据
  const columnsMenu = [
    {
      title: "菜单名",
      dataIndex: "menuname",
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
      title: "简介",
      dataIndex: "introduction",
      ellipsis: true,
    },
    {
      title: "封面图",
      dataIndex: "background",
      width: 100,
      render: (_: any, record: any) => {
        return (
          <img
            src={record.background}
            alt=""
            style={{ width: "100%", height: "50px" }}
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
            <Popconfirm
              title="是否移除该菜单？"
              okText="确认"
              cancelText="取消"
              onConfirm={() => {
                handleDelete(record.menuid, "Menu");
              }}
            >
              <Button type="link" style={{ padding: "0" }}>
                移除收藏
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  // 表格标题数据
  const columnsRecipe = [
    {
      title: "id",
      dataIndex: "id",
      width: 50,
    },
    {
      title: "菜谱名",
      dataIndex: "menu_name",
      ellipsis: true,
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
      title: "简介",
      dataIndex: "introduce",
      ellipsis: true,
      width: 300,
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
            <Popconfirm
              title="是否移除该菜单？"
              okText="确认"
              cancelText="取消"
              onConfirm={() => {
                handleDelete(record.id, "Recipe");
              }}
            >
              <Button type="link" style={{ padding: "0" }}>
                移除收藏
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
          已收藏菜单（{menuList.length || 0}）
        </h3>
        <Table
          dataSource={menuList}
          columns={columnsMenu}
          pagination={{
            pageSize: 5,
            total: menuList.length,
          }}
          bordered={true}
          rowKey={(record) => record.id}
        />
      </BaseCard>
      <BaseCard marginBottom="24px">
        <h3 style={{ marginBottom: "24px" }}>
          已收藏菜谱（{recipeList.length || 0}）
        </h3>
        <Table
          dataSource={recipeList}
          columns={columnsRecipe}
          pagination={{
            pageSize: 5,
            total: menuList.length,
          }}
          bordered={true}
          rowKey={(record) => record.id}
        />
      </BaseCard>
      <BaseCard marginBottom="24px">
        <h3 style={{ marginBottom: "24px" }}>
          已收藏笔记（{notesList.length || 0}）
        </h3>
        <Table
          dataSource={notesList}
          columns={columnsNotes}
          pagination={{
            pageSize: 5,
            total: notesList.length,
          }}
          bordered={true}
          rowKey={(record) => record.id}
        />
      </BaseCard>
    </>
  );
};

export default Collect;
