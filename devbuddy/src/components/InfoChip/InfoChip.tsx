import React from "react";
import Tooltip from "../Tooltip/Tooltip";
import styles from "./InfoChip.module.scss";
import { ReactComponent as Hint } from "../../assets/svg/tips_bulb.svg";

interface InfoChipProps {
  info: string;
  delay?: number;
}

export default function InfoChip({ info, delay = 400 }: InfoChipProps) {
  return (
    <Tooltip content={info} delay={delay}>
      <div className={styles.infoButton}>
        <Hint />
      </div>
    </Tooltip>
  );
}
