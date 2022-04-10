import React from "react";
import styles from "./Chip.module.scss";

interface ChipProps {
  label: string;
  onClick: () => void;
  onDelete?: () => void;
}
export default function Chip({ label, onClick, onDelete }: ChipProps) {
  return (
    <div className={styles.container} onClick={onClick}>
      <div
        className={styles.chipRemoveBtn}
        onClick={(e) => {
          e.stopPropagation();
          onDelete && onDelete();
        }}
      >
        X
      </div>
      <p className={styles.label}>{label}</p>
    </div>
  );
}
