import React, { useState } from "react";

import styles from "./Select.module.scss";

interface SelectProps {
  value: any;
  placeholder: string;
  options: any[];
  optionValue?: string;
  onChange?: (option: any) => void;
}

const Select = ({
  value,
  placeholder,
  options,
  onChange,
  optionValue,
}: SelectProps) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className={styles.shutter} onClick={handleClick}>
      {optionValue ? value[optionValue] : value || placeholder}
      {showDropdown && (
        <div className={styles.options}>
          {options.map((option, index) => (
            <div
              key={index}
              className={styles.option}
              onClick={() => {
                if (onChange) onChange(option);
                setShowDropdown(false);
              }}
              style={
                option === (optionValue ? value[optionValue] : value)
                  ? { backgroundColor: "#cc6699", color: "#fff" }
                  : {}
              }
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
