import React from "react";
import styles from "./Textarea.module.scss";
interface TextareaProps {
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  style?: React.CSSProperties;
  resize?: "none" | "both" | "horizontal" | "vertical";
}
export default function Textarea({
  value,
  onBlur,
  onChange,
  onFocus,
  resize,
  style,
}: TextareaProps) {
  return (
    <div
      className={`${styles.inputContainer} ${styles.defaultInput}`}
      style={{ ...style, resize }}
    >
      <textarea
        // TODO: CHECK IF THIS STYLE SHOULD BE THE SME WITH THE ONE ABOVE
        style={{ ...style, resize: "none" }}
        className={styles.textarea}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
}
