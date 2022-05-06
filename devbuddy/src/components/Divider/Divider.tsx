import React from "react";
import styles from "./Divider.module.scss";

interface DividerProps {
  style?: React.CSSProperties;
}
export default function Divider({ style }: DividerProps) {
  return <div className={styles.divider} style={style}></div>;
}
