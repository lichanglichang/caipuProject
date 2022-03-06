import {Card} from "antd";
import React from "react";
import "./index.css";
interface IProps {
  marginBottom?: string;
}
const BaseCard: React.FC<IProps> = ({children, marginBottom}) => {
  return (
    <Card
      bordered={false}
      style={{
        marginBottom: marginBottom ? marginBottom : "0",
      }}
      className="cardWrap"
    >
      {children}
    </Card>
  );
};

export default BaseCard;
