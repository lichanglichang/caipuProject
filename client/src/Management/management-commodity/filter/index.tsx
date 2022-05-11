import {Button, Form, Input, InputNumber} from "antd";
import React from "react";
import {
  SearchFormRow,
  SearchFormCol,
  SearchFormSpace,
} from "../../components/search-form-grid/index";

interface IProps {
  getCommodity:(params:any)=>void
}
const Filter: React.FC<IProps> = ({getCommodity}) => {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      autoComplete="off"
      initialValues={{goodsname: "",address:""}}
      onFinish={() => {
        form.validateFields().then(res => {
          console.log(res);
          getCommodity(res)
        });
      }}
    >
      <SearchFormRow>
        <SearchFormCol>
          <Form.Item label="商品名称" name="goodsname">
            <Input placeholder="请输入查询商品名称" />
          </Form.Item>
        </SearchFormCol>
        <SearchFormCol>
          <Form.Item label="发货地" name="address">
            <Input placeholder="请输入发货地址" />
          </Form.Item>
        </SearchFormCol>
         <Form.Item label="价格区间" name="lowerPrice" initialValue="0">
          <InputNumber min={0}  placeholder="最低"/>
          </Form.Item><span style={{marginTop:"5px"}}>至</span>
          <Form.Item name="highPrice" initialValue="">
          <InputNumber min={0} placeholder="最高" />
          </Form.Item>
        <SearchFormCol>
          <Form.Item>
            <SearchFormSpace>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  form.setFieldsValue({goodsname: "",address:"",lowerPrice:0,highPrice:""});
                  getCommodity({goodsname: "",address:"",lowerPrice:0,highPrice:""})
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
