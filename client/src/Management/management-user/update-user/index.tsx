import {
  Button,
  Calendar,
  Card,
  Cascader as Cascaded,
  Form,
  Input,
  Select,
  Tag,
  Upload,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./index.module.less";
import BaseCard from "../../components/base-card";
import {
  formSingleLayoutProps,
  SearchFormSpace,
} from "../../components/search-form-grid";
import { PlusOutlined } from "@ant-design/icons";

const UpdateUser = () => {
  const { id } = useParams();
  const [form] = useForm();
  const [fileList, setFileList] = useState<any>([]);

  useEffect(() => {
    axios.get("queryUserInfo", { params: { id } }).then((res) => {
      form.setFieldsValue(res.data[0]);
      setFileList([
        {
          uid: id,
          name: "image.png",
          status: "done",
          url: res.data[0].url,
        },
      ]);
    });
  }, [id]);

  // 改变日历
  function onPanelChange(value: any) {
    console.log(Date.parse(value._d), new Date(1646312927000));
    const year = new Date(value._d).getFullYear();
    const month = new Date(value._d).getMonth();
    const day = new Date(value._d).getDate();
    form.setFields([
      {
        name: "birthday",
        value: `${year}-${month}-${day}`,
      },
      {
        name: "date",
        value: value._d,
      },
    ]);
  }

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
        name: "url",
        value: file.response,
      },
    ]);
    setFileList(fileList);
  };

  // 地址选择框
  const options = [
    {
      value: "zhejiang",
      label: "重庆市",
      children: [
        {
          value: "hangzhou",
          label: "渝北区",
        },
        {
          value: "jiuLongPo",
          label: "九龙坡",
        },
        {
          value: "shaPingBa",
          label: "沙坪坝",
        },
        {
          value: "wanZou",
          label: "万州区",
        },
      ],
    },
    {
      value: "jiangsu",
      label: "Jiangsu",
      children: [
        {
          value: "nanjing",
          label: "Nanjing",
          children: [
            {
              value: "zhonghuamen",
              label: "Zhong Hua Men",
            },
          ],
        },
      ],
    },
  ];

  function onChange(value: any) {
    console.log(value);
  }

  const optionsTow = [
    { value: "green", label: "酸",},
    { value: "pink" , label: "甜",},
    { value: "blue" , label: "苦",},
    { value: "red" , label: "辣",},
  ];

  function tagRender(props: any) {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: any) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={value}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  }

  return (
    <>
      <Form
        form={form}
        autoComplete="off"
        layout="vertical"
        onFinish={() => {
          console.log("提交信息");
        }}
        {...formSingleLayoutProps}
      >
        <BaseCard paddingBottom="60px">
          <Form.Item label="昵称" name="nickname">
            <Input placeholder="请输入查询昵称" />
          </Form.Item>

          <Form.Item label="头像" name="url">
            <Upload
              action="http://localhost:8200/uploadimg"
              listType="picture-card"
              fileList={fileList}
              // onPreview={this.handlePreview}
              onChange={handleChange}
              maxCount={1}
            >
              {fileList.length ? null : uploadButton}
            </Upload>
          </Form.Item>

          <Form.Item label="账号" name="username">
            <Input placeholder="请输入查询账号" disabled />
          </Form.Item>

          <Form.Item label="密码" name="password">
            <Input placeholder="请输入查询账号" />
          </Form.Item>

          <Form.Item label="生日" name="birthday">
            <Input placeholder="请输入查询账号" />
          </Form.Item>
          <div style={{ width: "300px" }}>
            <Calendar fullscreen={false} onChange={onPanelChange} />
          </div>

          <Form.Item label="个性签名" name="introduce_myself">
            <Input.TextArea rows={4}  placeholder="请输入查询账号" />
          </Form.Item>
          <Form.Item
            label="地址"
            name="addres"
            initialValue={["zhejiang", "hangzhou"]}
          >
            <Cascaded
              options={options}
              onChange={onChange}
              placeholder="Please select"
            />
          </Form.Item>

          <Form.Item label="口味" name="tastes" initialValue={["green", "red"]}>
          <Select
            mode="multiple"
            showArrow
            tagRender={tagRender}
            options={optionsTow}
          />
          </Form.Item>
         
        </BaseCard>
        <Card className={styles.wrapControl}>
          <SearchFormSpace>
            <Button type="primary">返回</Button>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </SearchFormSpace>
        </Card>
      </Form>
    </>
  );
};

export default UpdateUser;
