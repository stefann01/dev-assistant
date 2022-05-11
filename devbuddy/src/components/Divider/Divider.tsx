import React from "react";
import styles from "./Divider.module.scss";

type DividerStyle = {
  lineStyle?: {
    borderColor: string;
    borderWidth: string;
  };
  height?: string;
  text?: {
    color?: string;
    fontSize?: string;
    fontWeight?: string;
    spacing?: string;
  };
};

interface DividerProps {
  style?: DividerStyle;
  text?: string;
}
export default function Divider({ style, text }: DividerProps) {
  return (
    <>
      {!text && (
        <div
          className={styles.divider}
          style={{
            border: `${style?.lineStyle?.borderWidth} solid ${style?.lineStyle?.borderColor}`,
            height: style?.height,
          }}
        ></div>
      )}
      {text && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            height: style?.height,
          }}
        >
          <div className={styles.divider} style={{ width: "50%" }}></div>
          <span
            style={{
              marginLeft: style?.text?.spacing,
              marginRight: style?.text?.spacing,
              fontSize: style?.text?.fontSize,
              fontWeight: style?.text?.fontWeight,
              color: style?.text?.color,
            }}
          >
            {text}
          </span>
          <div className={styles.divider} style={{ width: "50%" }}></div>
        </div>
      )}
    </>
  );
}
