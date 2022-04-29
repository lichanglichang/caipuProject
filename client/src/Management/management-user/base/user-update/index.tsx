import {
  Button,
  Card,
  Cascader as Cascaded,
  DatePicker,
  Form,
  Input,
  message,
  Select,
  Tag,
  Upload,
} from "antd";

import { useForm } from "antd/lib/form/Form";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./index.module.less";
import BaseCard from "../../../components/base-card";
import {
  formSingleLayoutProps,
  SearchFormSpace,
} from "../../../components/search-form-grid";
import { PlusOutlined } from "@ant-design/icons";
import { options, tasteOption } from "./data";
import moment from "moment";

const UpdateUser: React.FC = () => {
  const { id }: any = useParams();
  const [form] = useForm();
  const [fileList, setFileList] = useState<any>([]);
  const navigate = useNavigate();

  // 进入页面加载数据
  useEffect(() => {
    axios.get("queryUserInfo", { params: { id } }).then((res) => {
      form.setFieldsValue({
        ...res.data[0],
        addressOther: JSON.parse(res.data[0].addressOther),
        tasteOther: JSON.parse(res.data[0].tasteOther),
        id,
        birthday: moment(res.data[0].birthday),
      });
      setFileList([
        {
          uid: id,
          name: "image.png",
          status: "done",
          url: res.data[0].url,
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
        name: "url",
        value: file.response,
      },
    ]);
    setFileList(fileList);
  };

  //  地址改变
  function onChange(value: any) {
    console.log(value);
  }

  // 多选自定义tag标签
  function tagRender(props: any) {
    const { label, closable, onClose } = props;
    const onPreventMouseDown = (event: any) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={"blue"}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  }

  // 保存修改
  const handleSave = () => {
    form.validateFields().then((res) => {
      axios
        .post("updateUserInfo", {
          ...res,
          addressOther: JSON.stringify(res.addressOther),
          tasteOther: JSON.stringify(res.tasteOther),
          birthday: moment(res.birthday).format("YYYY-MM-DD"),
        })
        .then(() => {
          message.success("修改成功！");
          navigate("/Management/user/base");
        });
    });
  };

  function handleChangeTime(date: any, dateString: any) {
    console.log(date, dateString);
  }

  return (
    <>
      <Form
        form={form}
        autoComplete="off"
        layout="vertical"
        onFinish={() => {
          handleSave();
        }}
        {...formSingleLayoutProps}
      >
        <BaseCard paddingBottom="60px">
          <Form.Item name="id" hidden />
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
            <Input disabled />
          </Form.Item>

          <Form.Item label="密码" name="password">
            <Input disabled />
          </Form.Item>
          <Form.Item label="生日" name="birthday">
            <DatePicker onChange={handleChangeTime} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="个性签名" name="introduce_myself">
            <Input.TextArea rows={4} placeholder="请输入查询账号" />
          </Form.Item>
          <Form.Item label="地址" name="addressOther">
            <Cascaded
              options={options}
              onChange={onChange}
              placeholder="Please select"
            />
          </Form.Item>

          <Form.Item label="口味" name="tasteOther">
            <Select
              mode="multiple"
              showArrow
              tagRender={tagRender}
              options={tasteOption}
            />
          </Form.Item>
        </BaseCard>
        <Card className={styles.wrapControl}>
          <SearchFormSpace>
            <Button
              type="primary"
              onClick={() => {
                navigate("/Management/user/base");
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

export default UpdateUser;
