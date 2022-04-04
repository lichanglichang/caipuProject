import {Button, Form, Input} from "antd";
import React from "react";
import {
  SearchFormRow,
  SearchFormCol,
  SearchFormSpace,
} from "../../components/search-form-grid/index";


export type notesType={
  username:string,
  account:string,
  title:string,
}
interface IProps{
  getNotes:(value:notesType)=>void
}

const Filter: React.FC<IProps> = ({getNotes}) => {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      autoComplete="off"
      initialValues={{username: "",account:"",title:""}}
      onFinish={() => {
        form.validateFields().then(res => {
          getNotes(res)
        });
      }}
    >
      <SearchFormRow>
      <SearchFormCol>
          <Form.Item label="作者" name="username">
            <Input placeholder="请输入查询作者" />
          </Form.Item>
        </SearchFormCol>
        <SearchFormCol>
          <Form.Item label="账号" name="account">
            <Input placeholder="请输入查询账号" />
          </Form.Item>
        </SearchFormCol>
        <SearchFormCol>
          <Form.Item label="笔记名"  name="title">
            <Input placeholder="请输入查询笔记名" />
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
                  form.setFieldsValue({username: "",account:"",title:""});
                  getNotes({username: "",account:"",title:""})
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
