import React, { useState } from "react";
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
  const [fileList, setFileList] = useState<any>([]);
  const navigate = useNavigate();

  // 上传头像样式
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

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
    axios.post("addMenu", { ...values }).then((res) => {
if(res.data.code===1){
  message.success(res.data.msg)
  navigate("/Management/menu");
}else{
  message.error(res.data.msg)
}
    });
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
          <Form.Item label="菜单名称" name="menuname">
            <Input placeholder="请输入菜单名称" />
          </Form.Item>

          <Form.Item label="封面图" name="background">
            <Upload
              action="http://localhost:8200/uploadimg"
              listType="picture-card"
              fileList={fileList}
              // onPreview={this.handlePreview}
              onChange={handleChange}
              maxCount={1}
              className={styles.upload}
            >
              {fileList.length ? null : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item label="作者账号" name="username">
            <Input placeholder="请输入发布者账号" />
          </Form.Item>
          <Form.Item label="简介" name="introduction">
            <Input.TextArea rows={4} placeholder="请输入菜单简介" />
          </Form.Item>
          <Form.List name="recipeid">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                    label={`菜谱${index + 1}`}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message:
                            "Please input passenger's name or delete this field.",
                        },
                      ]}
                      noStyle
                    >
                      <Input
                        placeholder="输入对应的菜谱id"
                        style={{ width: "90%" }}
                      />
                    </Form.Item>
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{ width: "100%" }}
                    icon={<PlusOutlined />}
                  >
                    添加菜谱
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </BaseCard>
        <Card className={styles.wrapControl}>
          <SearchFormSpace>
            <Button
              type="primary"
              onClick={() => {
                navigate("/Management/menu");
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
