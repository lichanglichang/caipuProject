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
import axios from "axios";
import React, { useEffect, useState } from "react";
import ManageMainComponent from "../components/main-layout";
import BaseCard from "../components/base-card";
import Filter from "./components/filter";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

export interface Params {
  username: string;
  nickname: string;
  userStatus: string;
}

function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file: any) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

const ManagementUser: React.FC = () => {
  // upload

  const [state, setState] = useState({ loading: false });
  const { loading } = state;
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  //  const handleChange = (info:any) => {
  //     if (info.file.status === 'uploading') {
  //       setState({ loading: true });
  //       return;
  //     }
  //     if (info.file.status === 'done') {
  //       // Get this url from response in real world.
  //       getBase64(info.file.originFileObj, imageUrl =>
  //         setState({
  //           imageUrl,
  //           loading: false,
  //         }),
  //       );
  //     }
  //   };

  const [isModalVisible, setIsModalVisible] = useState(false);
  // modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  let navigate = useNavigate();
  //获取用户信息
  const [userList, setUserList] = useState<any>([]);
  // withCredenticial:true

  useEffect(() => {
    axios.get("/getUser").then((res: any) => {
      setUserList(res.data.data);
    });
  }, [navigate]);

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
          <Switch
            checkedChildren="启用"
            unCheckedChildren="禁用"
            defaultChecked={!!record.userStatus}
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
            <Button type="link" style={{ padding: "0" }}>
              编辑
            </Button>
            <Popconfirm
              title="是否确认删除该用户"
              okText="确认"
              cancelText="取消"
            >
               <Button type="link" style={{ padding: "0" }}>
              删除
            </Button>
            </Popconfirm>
            ,
           
          </Space>
        );
      },
    },
  ];

  return (
    <ManageMainComponent>
      <BaseCard marginBottom="16px">
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
            pageSize: 3,
            total: userList.length,
          }}
          bordered={true}
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
        >
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
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input />
          </Form.Item>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            // onChange={this.handleChange}
          >
            <div>
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div style={{ marginTop: 8 }}>上传头像</div>
            </div>
          </Upload>
        </Form>
      </Modal>
    </ManageMainComponent>
  );
};
export default ManagementUser;
