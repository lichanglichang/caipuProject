import React, { useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  message,
  Select,
  Space,
  Upload,
} from "antd";
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
import { tasteOption } from "../data";
const RecipeAdd: React.FC = () => {
  const [form] = useForm();
  const [fileList, setFileList] = useState<any>([]);
  const [fileListTow, setFileListTow] = useState<any>([]);
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
    setFileList(fileList);
  };

  const onChange = ({ fileList, file }: any) => {
    setFileListTow(fileList);
  };

  // 添加菜谱
  const onFinish = (values: any) => {
    const img = "/public/upload/" +values.img?.fileList[0].name
    const step = values.picture.fileList.map((item:any,index:number)=>{
     return {
       des:values.steps[index].des,
       url:"/public/upload/" + item.name
     }
    })


    axios
      .post("addRecipe", {
        ...values,
        discrib: JSON.stringify(values.discrib),
        steps: JSON.stringify(step),
        img: img,
      })
      .then((res) => {
        if (res.data.code === 1) {
          message.success(res.data.msg);
          navigate("/Management/recipe");
        } else {
          message.error(res.data.msg);
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
          <Form.Item label="菜谱名" name="menu_name">
            <Input placeholder="请输入菜谱名" />
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
          <Form.Item label="账号" name="username">
            <Input placeholder="请输入发布者账号" />
          </Form.Item>
          <Form.Item label="类型" name="type">
            <Select showArrow options={tasteOption} placeholder="请选择类型" />
          </Form.Item>
          <Form.Item label="简介" name="introduce">
            <Input.TextArea rows={4} placeholder="请输入菜谱简介" />
          </Form.Item>
          <Form.List name="discrib">
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
              onChange={onChange}
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
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </SearchFormSpace>
        </Card>
      </Form>
    </>
  );
};

export default RecipeAdd;
