import React from "react";
import styles from "./index.module.scss";

const ScrollBox: React.FC<{ flex: number; children: React.ReactNode }> = (
  props
) => {
  return (
    <div
      style={{ height: "100%", overflow: "auto", flex: props.flex }}
      className={styles.scroll}
    >
      {props.children}
    </div>
  );
};

export default ScrollBox;
