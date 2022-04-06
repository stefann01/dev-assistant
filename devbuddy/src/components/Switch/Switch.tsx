import React from "react";
import styles from "./Switch.module.scss";

interface SwitchProps {
  isActive: boolean;
  onChange: () => void;
  style?: any;
}
export default function Switch({ isActive, onChange, style }: SwitchProps) {
  return (
    <div
      style={{ ...style }}
      className={styles.container}
      onClick={() => {
        onChange();
      }}
    >
      <div
        className={`${styles.switchToggle} ${
          isActive ? styles.switchRight : styles.switchLeft
        }`}
      ></div>
    </div>
  );
}
