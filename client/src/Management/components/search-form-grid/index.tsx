import React from "react";
import type {RowProps, ColProps, SpaceProps} from "antd";
import {Row, Col, Space} from "antd";

// 列表上查询条件表单布局配置
const listSearchFormItemProps = {
  rowProps: {gutter: {xs: 12, sm: 24}},
  colProps: {
    xs: {span: 24},
    sm: {span: 24},
    md: {span: 12},
    lg: {span: 8},
    xl: {span: 8},
    xxl: {span: 6},
  },
};
/**
 * 搜索表单的包裹
 */
export const SearchFormRow: React.FC<RowProps> = props => {
  return <Row {...listSearchFormItemProps.rowProps} {...props} />;
};

/**
 * 搜索表单每项包裹
 */
export const SearchFormCol: React.FC<ColProps> = props => {
  return <Col {...listSearchFormItemProps.colProps} {...props} />;
};

/**
 * 搜索表单 按钮的间距
 */
 export const SearchFormSpace: React.FC<SpaceProps> = props => {
  return <Space size={16} {...props} />;
};

// 单列表单配置
export const formSingleLayoutProps = {
  labelCol: {
    xxl: {
      span: 0,
    },
    md: {
      span: 0,
    },
    xs: {
      span: 0,
    },
  },
  wrapperCol: {
    xxl: {
      span: 6,
    },
    xl: {
      span: 8,
    },
    md: {
      span: 12,
    },
    xs: {
      span: 24,
    },
  },
}
