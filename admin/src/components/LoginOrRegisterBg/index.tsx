import React from "react";
import { Image } from "antd";
import styles from "./index.module.scss";
import Bg1Svg from "../../assets/bg1.svg";

interface IProps {
  children: React.ReactNode;
}

/**
 * 登录 或 注册 的背景 UI
 */
const LoginOrRegisterBg: React.FC<IProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {props.children}
      </div>
      <div className={styles.right}>
        <Image width={"70%"} src={Bg1Svg} preview={false} />
      </div>
    </div>
  );
};

export default LoginOrRegisterBg;
