import {Button, Form, Input} from "antd";
import React from "react";
import {
  SearchFormRow,
  SearchFormCol,
  SearchFormSpace,
} from "../../../components/search-form-grid";
import {Params} from "../../index";
interface IProps {
  handleSearch: (params: Params) => void;
}
const Filter: React.FC<IProps> = ({handleSearch}) => {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      autoComplete="off"
      initialValues={{num: 1}}
      onFinish={() => {
        form.validateFields().then(res => {
          handleSearch(res);
        });
      }}
    >
      <SearchFormRow>
        <SearchFormCol>
          <Form.Item label="昵称" name="kw">
            <Input placeholder="请输入查询昵称" />
          </Form.Item>
        </SearchFormCol>
        <SearchFormCol>
          <Form.Item label="账号">
            <Input placeholder="请输入查询账号" />
          </Form.Item>
        </SearchFormCol>
        <SearchFormCol>
          <Form.Item label="状态">
            <Input placeholder="请输入查询账号" />
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
                  handleSearch({num: 1, kw: ""});
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
