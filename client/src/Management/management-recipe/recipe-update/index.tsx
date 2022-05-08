import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Upload, Card, Button, message, Select } from "antd";
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
  const [step, setStep] = useState<any>([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get("queryRecipe", { params: { id } }).then((res) => {
      form.setFieldsValue({
        ...res.data[0],
        steps: JSON.parse(res.data[0].steps),
      });
      setFileList([
        {
          uid: id,
          name: "image.png",
          status: "done",
          url: res.data[0].img,
        },
      ]);
      setStep(JSON.parse(res.data[0].steps));
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
          {step.map((item: any) => {
            return (
              <div style={{ margin: "20px" }}>
                <h4>{item.step}：</h4>
                <p>{item.des}</p>
                <img src={`${item.url}`} alt="" />
              </div>
            );
          })}
          {/* <Form.List name="steps">
          {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'first']}
                  rules={[{ required: true, message: 'Missing first name' }]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'last']}
                  rules={[{ required: true, message: 'Missing last name' }]}
                >
                  <Input placeholder="Last Name" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add field
              </Button>
            </Form.Item>
          </>
               )}
          </Form.List> */}
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
