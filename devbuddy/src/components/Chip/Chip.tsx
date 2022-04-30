import React from "react";
import styles from "./Chip.module.scss";
import { ReactComponent as Close } from "../../assets/svg/close.svg";

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
        <Close />
      </div>
      <p className={styles.label}>{label}</p>
    </div>
  );
}
