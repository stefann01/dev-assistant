import React from "react";
import styles from "./Toggle.module.scss";

interface ToggleProps {
  isActive: boolean;
  onChange: () => void;
  style?: any;
  firstLabel?: string;
  secondLabel?: string;
}
export default function Toggle({
  isActive,
  onChange,
  style,
  firstLabel,
  secondLabel,
}: ToggleProps) {
  return (
    <div
      style={style}
      className={styles.container}
      onClick={() => {
        onChange();
      }}
    >
      <div
        className={`${styles.toggle} ${
          isActive ? styles.toggleRight : styles.toggleLeft
        }`}
      ></div>
      <p className={styles.leftText}>{firstLabel}</p>
      <p className={styles.rightText}>{secondLabel}</p>
    </div>
  );
}
