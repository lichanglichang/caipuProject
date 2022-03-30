import {Button, Form, Input} from "antd";
import React from "react";
import { Params } from "..";
import {
  SearchFormRow,
  SearchFormCol,
  SearchFormSpace,
} from "../../components/search-form-grid/index";

// interface IProps {
//   getAllMenu: (params: Params) => void;
// }

const Filter: React.FC<any> = ({getAllMenu}) => {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      autoComplete="off"
      initialValues={{username:"",menuname:"",nickname:""}}
      onFinish={() => {
        form.validateFields().then(res => {
          getAllMenu(res)
        });
      }}
    >
      <SearchFormRow>
        <SearchFormCol>
          <Form.Item label="作者" name="nickname">
            <Input placeholder="请输入查询作者" />
          </Form.Item>
        </SearchFormCol>
        <SearchFormCol>
          <Form.Item label="账号" name="username">
            <Input placeholder="请输入查询账号" />
          </Form.Item>
        </SearchFormCol>
        <SearchFormCol>
          <Form.Item label="菜单名"  name="menuname">
            <Input placeholder="请输入查询菜单名" />
          </Form.Item>
        </SearchFormCol>
        <SearchFormCol>
          <Form.Item>
            <SearchFormSpace>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  form.setFieldsValue({username: "",menuname:"",nickname:""});
                  getAllMenu({username: "",menuname:"",nickname:""})
                }}
              >
                重置
              </Button>
            </SearchFormSpace>
          </Form.Item>
        </SearchFormCol>
      </SearchFormRow>
    </Form>
  );
};
export default Filter;
