import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, Upload, Card, Button, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BaseCard from "../../components/base-card";
import styles from "./index.module.less";
import {
  formSingleLayoutProps,
  SearchFormSpace,
} from "../../components/search-form-grid";
import axios from "axios";
const MenuUpdate: React.FC = () => {
  const [form] = useForm();
  const [fileList, setFileList] = useState<any>([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get("queryMenu", { params: { id } }).then((res) => {
      form.setFieldsValue({
        ...res.data[0],
        recipeid: JSON.parse(res.data[0].recipeid),
      });
      console.log(res.data[0]);

      setFileList([
        {
          uid: id,
          name: "image.png",
          status: "done",
          url: res.data[0].background,
        },
      ]);
    });
  }, []);
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

  // 保存编辑
  const handleSave = () => {
    form.validateFields().then((res) => {
      axios.post("updateMenu", { ...res }).then((res) => {
        if (res.data.code === 1) {
          message.success(res.data.msg);
          navigate("/Management/menu");
        } else {
          message.error(res.data.msg);
        }
      });
    });
  };

  return (
    <>
      <Form
        form={form}
        autoComplete="off"
        layout="vertical"
        {...formSingleLayoutProps}
        // onFinish={onFinish}
      >
        <BaseCard paddingBottom="60px">
          <Form.Item name="menuid" hidden initialValue={{ menuid: id }} />
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
            <Input.TextArea rows={6} placeholder="请输入菜单简介" />
          </Form.Item>
          <Form.List name="recipeid">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => {
                  return (
                    <Form.Item
                      // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                      label={`菜谱${index + 1}`}
                      required={false}
                      key={field.key}
                    >
                      <Form.Item
                        {...field}
                        // validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            // whitespace: true,
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
                  );
                })}
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
            <Button type="primary" htmlType="submit" onClick={handleSave}>
              保存
            </Button>
          </SearchFormSpace>
        </Card>
      </Form>
    </>
  );
};

export default MenuUpdate;
