import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export default function Button({
  children,
  onClick,
  style,
  disabled,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={styles.btn}
      style={{ ...style }}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
