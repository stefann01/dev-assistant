import React from "react";
import styles from "./SectionTitle.module.scss";
import Plus from "../../assets/svg/Plus.svg";

interface SectionTitleProps {
  onButtonClick: () => void;
  title: string;
}
export default function SectionTitle({
  onButtonClick,
  title,
}: SectionTitleProps) {
  return (
    <div className={styles.header}>
      {title}
      <button className={styles.button} onClick={onButtonClick}>
        <img src={Plus} alt="Add property" />
      </button>
    </div>
  );
}
