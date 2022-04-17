import React from "react";
import styles from "./SectionTitle.module.scss";
import { ReactComponent as Plus } from "../../assets/svg/Plus.svg";
import { ReactComponent as OpenedEye } from "../../assets/svg/opened_eye.svg";
import { ReactComponent as ClosedEye } from "../../assets/svg/closed_eye.svg";

interface SectionTitleProps {
  onButtonClick: () => void;
  title: string;
  onShowHide?: () => void;
  isShow?: boolean;
}
export default function SectionTitle({
  onButtonClick,
  title,
  onShowHide,
  isShow = true,
}: SectionTitleProps) {
  return (
    <div className={styles.header}>
      {title}
      {onShowHide && (
        <button className={styles.showHideButton} onClick={onShowHide}>
          {isShow ? <OpenedEye /> : <ClosedEye />}
        </button>
      )}
      <button
        style={{ marginLeft: onShowHide ? "0px" : "auto" }}
        className={styles.button}
        onClick={onButtonClick}
      >
        <Plus />
      </button>
    </div>
  );
}
