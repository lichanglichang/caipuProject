import {Button, Form, Input} from "antd";
import React from "react";
import {
  SearchFormRow,
  SearchFormCol,
  SearchFormSpace,
} from "../../components/search-form-grid/index";

export type recipeType={
  username:string,
  menu_name:string,
  nickname:string,
}
interface IProps{
  getRecipe:(value:recipeType)=>void
}

const Filter: React.FC<IProps> = ({getRecipe}) => {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      autoComplete="off"
      initialValues={{username:"",menu_name:"",nickname:""}}
      onFinish={() => {
        form.validateFields().then(res => {
          getRecipe(res)
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
          <Form.Item label="菜谱名"  name="menu_name">
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
                  form.setFieldsValue({username:"",menu_name:"",nickname:""});
                  getRecipe({username:"",menu_name:"",nickname:""})
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
