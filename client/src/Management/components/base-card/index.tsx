import {Card} from "antd";
import React from "react";
import styles from "./index.module.less";
interface IProps {
  marginBottom?: string;
  paddingBottom?:string;
}
const BaseCard: React.FC<IProps> = ({children, marginBottom,paddingBottom}) => {
  return (
    <Card
      bordered={false}
      style={{
        marginBottom: marginBottom ? marginBottom : "0",
        paddingBottom: paddingBottom ? paddingBottom : "0",
        overflow:"auto"
      }}
      className={styles.cardWrap}
    >
      {children}
    </Card>
  );
};

export default BaseCard;
