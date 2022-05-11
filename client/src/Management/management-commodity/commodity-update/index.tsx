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
const CommodityUpdate: React.FC = () => {
  const [form] = useForm();
  const [fileList, setFileList] = useState<any>([]);
  const [fileListTow, setFileListTow] = useState<any>([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get("queryGoods", { params: { id } }).then((res) => {
      console.log(res.data);

      form.setFieldsValue({
        ...res.data[0],
      });
        const data = JSON.parse(res.data[0].detailimg).map(
          (item: any, index: number) => {
            return {
              uid: index,
              name: "image.png",
              status: "done",
              url: item,
            };
          }
        );
      setFileListTow(data)
      setFileList([
        {
          uid: "img",
          name: "image.png",
          status: "done",
          url: res.data[0].picture,
        },
      ]);
    });
  }, [form, id]);

  // 保存编辑
  const onFinish = (values: any) => {
    console.log(values);
    const data = values.picture.fileList.map((item: any) => {
      return item.url;
    });

    axios
      .post("updateNotes", { ...values, picture: JSON.stringify(data) })
      .then((res) => {
        if (res.data.code === 1) {
          message.success(res.data.msg);
          navigate("/Management/notes");
        } else {
          message.error(res.data.msg);
        }
      });
  };

  // 图片改变
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
          <Form.Item name="id" hidden initialValue={{ id }} />
          <Form.Item label="商品名称" name="goodsname">
            <Input placeholder="请输入笔记标题" />
          </Form.Item>
       
          <Form.Item label="商品图" name="picture">
            <Upload
              action="http://localhost:8200/uploadimg"
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
            >
              {fileList.length < 1 && "+ 上传图片"}
            </Upload>
          </Form.Item>
          <Form.Item label="商品价格" name="price">
            <Input />
          </Form.Item>
          <Form.Item label="发货地址" name="address">
            <Input placeholder="请输入笔记标题" />
          </Form.Item>
          <Form.Item label="商品描述" name="introduction">
            <Input.TextArea rows={6} placeholder="请输入菜单简介" />
          </Form.Item>
          <Form.Item label="商品详情图" name="detailimg">
            <Upload
              action="http://localhost:8200/uploadimg"
              listType="picture-card"
              fileList={fileListTow}
              // onChange={onChange}
            >
              {fileList.length < 10 && "+ 上传图片"}
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

export default CommodityUpdate;
