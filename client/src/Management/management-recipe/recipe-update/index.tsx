import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Upload,
  Card,
  Button,
  message,
  Select,
  Space,
  Avatar,
} from "antd";
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
import { tasteOption } from "../data";
const RecipeUpdate: React.FC = () => {
  const [form] = useForm();
  const [fileList, setFileList] = useState<any>([]);
  const [fileListTow, setFileListTow] = useState<any>([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get("queryRecipe", { params: { id } }).then((res) => {
      form.setFieldsValue({
        ...res.data[0],
        steps: JSON.parse(res.data[0].steps),
        describ: JSON.parse(res.data[0].describ),
      });

      const arr = JSON.parse(res.data[0].steps).map((item: any) => {
        return {
          uid: id,
          name: "img",
          status: "done",
          url: item.url,
        }
      });
      console.log(arr,"图片");
      
      setFileListTow(arr);
      setFileList([
        {
          uid: id,
          name: "img",
          status: "done",
          url: res.data[0].img,
        },
      ]);
    });
  }, [form, id]);

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
        name: "img",
        value: file.response,
      },
    ]);
    setFileList(fileList);
  };

  // 保存编辑
  const handleSave = () => {
    form.validateFields().then((res) => {
      axios.post("updateRecipe", { ...res }).then((res) => {
        if (res.data.code === 1) {
          message.success(res.data.msg);
          navigate("/Management/recipe");
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
          <Form.Item name="id" hidden initialValue={{ id: id }} />
          <Form.Item label="菜谱名" name="menu_name">
            <Input.TextArea rows={2} placeholder="请输入菜谱名" />
          </Form.Item>

          <Form.Item label="封面图" name="img">
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
            <Input disabled />
          </Form.Item>
          <Form.Item label="口味" name="type">
            <Select showArrow options={tasteOption} />
          </Form.Item>
          <Form.Item label="简介" name="introduce">
            <Input.TextArea rows={6} placeholder="请输入菜谱简介" />
          </Form.Item>
          <Form.List name="describ">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      label="用料"
                      name={[name, "name"]}
                      wrapperCol={{ span: 24 }}
                    >
                      <Input placeholder="请输入用料名称" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      label="用量"
                      wrapperCol={{ span: 24 }}
                      name={[name, "how"]}
                    >
                      <Input placeholder="请输入用料千克数" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    新增作料
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.List name="steps">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, index) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      label={`第${index + 1}步`}
                      name={[name, "des"]}
                      wrapperCol={{ span: 24 }}
                    >
                      <Input.TextArea rows={8} placeholder="请输入制作描述" />
                    </Form.Item>

                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                    style={{ width: "100%" }}
                  >
                    新增步骤
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item label="步骤图片" name="picture">
            <Upload
              action="http://localhost:8200/uploadimg"
              listType="picture-card"
              fileList={fileListTow}
              // onChange={onChange}
            >
              {fileList.length < 6 && "+ 上传图片"}
            </Upload>
          </Form.Item>
        </BaseCard>
        <Card className={styles.wrapControl}>
          <SearchFormSpace>
            <Button
              type="primary"
              onClick={() => {
                navigate("/Management/recipe");
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

export default RecipeUpdate;
