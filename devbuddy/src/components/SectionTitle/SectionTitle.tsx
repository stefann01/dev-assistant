import React from "react";
import styles from "./SectionTitle.module.scss";
import { ReactComponent as Plus } from "../../assets/svg/Plus.svg";
import { ReactComponent as OpenedEye } from "../../assets/svg/opened_eye.svg";
import { ReactComponent as ClosedEye } from "../../assets/svg/closed_eye.svg";
import Button from "../Button/Button";
import InfoChip from "../InfoChip/InfoChip";

interface SectionTitleProps {
  onButtonClick: () => void;
  title: string;
  onShowHide?: () => void;
  isShow?: boolean;
  showInfo?: boolean;
  info?: string;
}
export default function SectionTitle({
  onButtonClick,
  title,
  onShowHide,
  isShow = true,
  showInfo = false,
  info = "Your info text here",
}: SectionTitleProps) {
  return (
    <div className={styles.header}>
      {title}

      {showInfo && (
        <span style={{ marginLeft: "10px" }}>
          <InfoChip info={info} />
        </span>
      )}

      {onShowHide && (
        <button className={styles.showHideButton} onClick={onShowHide}>
          {isShow ? <OpenedEye /> : <ClosedEye />}
        </button>
      )}

      <Button
        style={{
          marginLeft: onShowHide ? "0px" : "auto",
          width: "32px",
          height: "32px",
        }}
        onClick={onButtonClick}
        disabled={!isShow}
      >
        <Plus />
      </Button>
    </div>
  );
}
