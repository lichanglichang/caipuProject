import React, { useRef, useState } from "react";
import { Button, Card, Form, Input, message, Upload } from "antd";
import { useForm } from "antd/lib/form/Form";
import styles from "./index.module.less";
import {
  formSingleLayoutProps,
  SearchFormSpace,
} from "../../components/search-form-grid";
import BaseCard from "../../components/base-card";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const NotesAdd: React.FC = () => {
  const [form] = useForm();
  // const [fileList, setFileList] = useState<any>([]);
  const navigate = useNavigate();

  // 上传图片得到图片地址
  const handleChange = ({ fileList, file }: any) => {
    form.setFields([
      {
        name: "background",
        value: file.response,
      },
    ]);
    setFileList(fileList);
  };

  // 添加菜单
  const onFinish = (values: any) => {
    // 处理图片地址
    const arr = values.picture?.fileList.map((item: any) => {
      return item.response;
    });
    // 新增笔记请求
    axios
      .post("addNotes", { ...values, picture: JSON.stringify(arr) })
      .then((res) => {
        if (res.data.code === 1) {
          message.success(res.data.msg);
          navigate("/Management/notes");
        } else {
          message.error(res.data.msg);
        }
      });
  };

  const [fileList, setFileList] = useState<any>([]);
  const onChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList);
  };

  return (
    <>
      <Form
        form={form}
        autoComplete="off"
        layout="vertical"
        {...formSingleLayoutProps}
        onFinish={onFinish}
      >
        <BaseCard paddingBottom="60px">
          <Form.Item label="笔记名称" name="title">
            <Input placeholder="请输入笔记名称" />
          </Form.Item>

          <Form.Item label="展示图片" name="picture">
            <Upload
              action="http://localhost:8200/uploadimg"
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              // onPreview={onPreview}
            >
              {fileList.length < 3 && "+ 上传图片"}
            </Upload>
          </Form.Item>
          <Form.Item label="作者账号" name="account">
            <Input placeholder="请输入发布者账号" />
          </Form.Item>
          <Form.Item label="内容" name="content">
            <Input.TextArea rows={4} placeholder="请输入笔记内容" />
          </Form.Item>
        </BaseCard>
        <Card className={styles.wrapControl}>
          <SearchFormSpace>
            <Button
              type="primary"
              onClick={() => {
                navigate("/Management/notes");
              }}
            >
              返回
            </Button>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </SearchFormSpace>
        </Card>
      </Form>
    </>
  );
};

export default NotesAdd;
