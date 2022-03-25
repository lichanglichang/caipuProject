import {Card} from "antd";
import React from "react";
import styles from "./index.module.less";
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
      className={styles.cardWrap}
    >
      {children}
    </Card>
  );
};

export default BaseCard;
