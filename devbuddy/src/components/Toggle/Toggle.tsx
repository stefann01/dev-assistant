import React from "react";
import styles from "./Toggle.module.scss";

interface ToggleProps {
  isActive: boolean;
  onChange: () => void;
  style?: any;
}
export default function Toggle({ isActive, onChange, style }: ToggleProps) {
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
      <p className={styles.leftText}>CSS</p>
      <p className={styles.rightText}>SCSS</p>
    </div>
  );
}
