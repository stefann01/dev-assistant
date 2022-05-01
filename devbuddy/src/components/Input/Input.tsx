import React from "react";
import styles from "./Input.module.scss";
import { ReactComponent as ErrorIcon } from "../../assets/svg/error.svg";
import { ReactComponent as CloseIcon } from "../../assets/svg/close.svg";

interface InputProps {
  value: string;
  type?: "text" | "number" | "password";
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  status?: "default" | "success" | "error";
}
export default function Input({
  value,
  type = "text",
  onChange,
  onFocus,
  onBlur,
  onClear,
  status = "default",
}: InputProps) {
  const ref = React.useRef<HTMLInputElement>(null);
  const statusStyle = React.useMemo(() => {
    switch (status) {
      case "default":
        return styles.defaultInput;
      case "success":
        return styles.successInput;
      case "error":
        return styles.errorInput;
      default:
        return styles.default;
    }
  }, [status]);

  const onInputClear = () => {
    if (onClear) {
      onClear();
      ref.current?.focus();
    }
  };

  return (
    <div className={`${styles.inputContainer} ${statusStyle}`}>
      <input
        ref={ref}
        spellCheck={true}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        className={styles.input}
      />
      {status === "error" && (
        <div className={styles.errorIcon}>
          <div style={{ display: "flex", position: "relative" }}>
            <CloseIcon
              onClick={onInputClear}
              className={styles.clearIcon}
              style={{
                marginRight: "2px",
                right: "calc(0% + 16px)",
              }}
            />
            <ErrorIcon />
          </div>
        </div>
      )}
      {status === "default" && value.length > 0 && (
        <CloseIcon
          onClick={onInputClear}
          className={styles.clearIcon}
          style={{
            right: "calc(0% + 8px)",
          }}
        />
      )}
    </div>
  );
}
