import {Button, Form, Input} from "antd";
import React from "react";
import {
  SearchFormRow,
  SearchFormCol,
  SearchFormSpace,
} from "../../components/search-form-grid/index";

const Filter: React.FC = () => {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      autoComplete="off"
      initialValues={{num: 1}}
      onFinish={() => {
        form.validateFields().then(res => {
          console.log(res);
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
          <Form.Item label="菜谱名"  name="menuname">
            <Input placeholder="请输入查询菜谱名" />
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
                  form.setFieldsValue({kw: ""});
                }}
              >
                重置
              </Button>
            </SearchFormSpace>
          </Form.Item>
        </SearchFormCol>
      </SearchFormRow>
      <Form.Item name="num" hidden></Form.Item>
    </Form>
  );
};
export default Filter;
