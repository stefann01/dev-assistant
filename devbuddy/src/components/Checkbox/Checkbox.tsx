import React from "react";
import styles from "./Checkbox.module.scss";

interface CheckboxProps {
  value: any;
  onChange: () => void;
  checked: boolean;
  label: string;
}

const Checkbox = ({ value, onChange, checked, label }: CheckboxProps) => {
  return (
    <>
      <input
        className={styles.checkbox}
        type="checkbox"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label className={styles.label}>{label}</label>
    </>
  );
};

export default Checkbox;
