import React from "react";
import styles from "./Input.module.scss";

interface InputProps {
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "number" | "password";
}
export default function Input({ value, type = "text", onChange }: InputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={styles.input}
    />
  );
}
