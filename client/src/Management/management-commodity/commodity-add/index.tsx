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
const CommodityAdd: React.FC = () => {
  const [form] = useForm();
  const navigate = useNavigate();

  // 添加菜单
  const onFinish = (values: any) => {
    // 处理图片地址
    const picture = values.picture?.fileList[0].response
    const detailimg = values.detailimg?.fileList.map((item: any) => {
      return item.response;
    });
    
    // 新增商品请求
    axios
      .post("addGoods", { ...values, picture: picture,detailimg:JSON.stringify(detailimg) })
      .then((res) => {
        if (res.data.code === 1) {
          message.success(res.data.msg);
          navigate("/Management/commodity");
        } 
      });
  };

  const [fileList, setFileList] = useState<any>([]);
  const [fileListTow, setFileListTow] = useState<any>([]);

  // 商品图片
  const onChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList);
  };

  // 商品详情图片
  const handleChange = ({ fileList, file }: any) => {
    setFileListTow(fileList);
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
          <Form.Item label="商品名称" name="goodsname">
            <Input placeholder="请输入笔记名称" />
          </Form.Item>
          <Form.Item label="商品图片" name="picture">
            <Upload
              action="http://localhost:8200/uploadimg"
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
            >
              {fileList.length < 1 && "+ 上传图片"}
            </Upload>
          </Form.Item>
          <Form.Item label="发货地" name="address">
            <Input placeholder="请输入发布者账号" />
          </Form.Item>
          <Form.Item label="价格" name="price">
            <Input placeholder="请输入商品价格" />
          </Form.Item>
          <Form.Item label="商品介绍" name="introduction">
            <Input.TextArea rows={4} placeholder="请输入笔记内容" />
          </Form.Item>
          <Form.Item label="商品详情图" name="detailimg">
            <Upload
              action="http://localhost:8200/uploadimg"
              listType="picture-card"
              fileList={fileListTow}
              onChange={handleChange}
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
                navigate("/Management/commodity");
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

export default CommodityAdd;
