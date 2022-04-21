import React from "react";
import styles from "./Input.module.scss";

interface InputProps {
  value: string;
  type?: "text" | "number" | "password";
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}
export default function Input({
  value,
  type = "text",
  onChange,
  onFocus,
  onBlur,
}: InputProps) {
  return (
    <input
      spellCheck={true}
      type={type}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      className={styles.input}
    />
  );
}
