import {
  Button,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Space,
  Switch,
  Table,
  Upload,
} from "antd";
import { HashRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ManageMainComponent from "../components/main-layout";
import BaseCard from "../components/base-card";
import Filter from "./components/filter";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { useForm } from "antd/lib/form/Form";
import UpdateUser from "./update-user";
import MainLayout from "../components/main-layout";

export interface Params {
  username: string;
  nickname: string;
  userStatus: string;
}

const ManagementUser: React.FC = () => {
  const [form] = useForm();

  const [state, setState] = useState([]);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  // 保存上传图片得到图片地址
  const handleChange = ({ fileList, file }: any) => {
    form.setFields([
      {
        name: "url",
        value: file.response,
      },
    ]);
    setState(fileList);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  // 确认新增
  const handleOk = () => {
    form.validateFields().then((res) => {
      axios.post("/addUser", res).then((res) => {
        if (res.data.code === 0) {
          axios.get("/getUser").then((res: any) => {
            setUserList(res.data.data);
          });
          setIsModalVisible(false);
          message.info("新增成功！");
        } else {
          message.error("用户已存在！");
        }
      });
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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

  // 删除用户
  const handelDelete = (record: any) => {
    axios.get("/delUser", { params: { id: record.id } }).then((res: any) => {
      axios.get("/getUser").then((res: any) => {
        setUserList(res.data.data);
      });

      if (res.data.code === 0) {
        message.info("删除成功!");
      }
    });
  };

  //   表格标题数据
  const columns = [
    {
      title: "账号",
      dataIndex: "username",
    },
    {
      title: "密码",
      dataIndex: "password",
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
      title: "状态",
      dataIndex: "userStatus",
      render: (_: any, record: any) => {
        return (
          <Popconfirm
            title="是否确认修改该用户状态"
            okText="确认"
            cancelText="取消"
            onConfirm={() => {
              const userStatus = record.userStatus === 0 ? "1" : "0";
              axios
                .post("updateUserStatus", { id: record.id, userStatus })
                .then(() => {
                  axios.get("/getUser").then((res: any) => {
                    setUserList(res.data.data);
                    message.info("修改用户状态成功！");
                  });
                });
            }}
          >
            <Switch
              checkedChildren="启用"
              unCheckedChildren="禁用"
              checked={!!record.userStatus}
            />
          </Popconfirm>
        );
      },
    },
    {
      title: "操作",
      dataIndex: "url",
      render: (_: any, record: any) => {
        return (
          <Space split={<Divider type="vertical" />}>
            <Button type="link" style={{ padding: "0" }} onClick={()=>{navigate(`/Management/user/userUpdate/${record.id}`)}}>
              编辑
            </Button>
            <Popconfirm
              title="是否确认删除该用户"
              okText="确认"
              cancelText="取消"
              onConfirm={() => {
                handelDelete(record);
              }}
            >
              <Button type="link" style={{ padding: "0" }}>
                删除
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <>   <BaseCard marginBottom="16px">
    <Filter handleSearch={handleSearchUser} />
  </BaseCard>
  <BaseCard>
    <Button
      type="primary"
      style={{ marginBottom: "20px" }}
      onClick={showModal}
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
      rowKey={(record) => record.id}
    />
  </BaseCard>
  <Modal
    title="新增用户"
    visible={isModalVisible}
    onOk={handleOk}
    onCancel={handleCancel}
    okText="确认"
    cancelText="取消"
  >
    <Form
      name="basic"
      initialValues={{ remember: true }}
      autoComplete="off"
      form={form}
    >
      <Form.Item name="id" hidden />
      <Form.Item
        label="用户名"
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="昵称"
        name="nickname"
        rules={[{ required: true, message: "请输入昵称" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="头像"
        name="url"
        rules={[{ required: true, message: "请上传头像" }]}
      >
        <Upload
          action="http://localhost:8200/uploadimg"
          listType="picture-card"
          fileList={state}
          // onPreview={this.handlePreview}
          onChange={handleChange}
          maxCount={1}
        >
          {state.length ? null : uploadButton}
        </Upload>
      </Form.Item>
    </Form>
  </Modal></>
 

 
  );
};
export default ManagementUser;
