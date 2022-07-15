import React, { useState } from "react";
import styles from "./Tooltip.module.scss";
interface TooltipProps {
  delay?: number;
  children: React.ReactNode;
  direction?: "left" | "right" | "top" | "bottom";
  content: string;
  gap?: number;
}
export default function Tooltip({
  delay = 400,
  children,
  content,
  direction = "left",
  gap = 10,
}: TooltipProps) {
  let timeout: any;

  const [tooltipData, setTooltipData] = useState({
    active: false,
    top: 0,
    left: 0,
  });

  const showTip = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    timeout = setTimeout(() => {
      const coords = (e.target as HTMLDivElement).getBoundingClientRect();
      const x = coords.top;
      const y = coords.left + coords.width + gap;
      setTooltipData({
        active: true,
        top: x,
        left: y,
      });
    }, delay);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setTooltipData({ ...tooltipData, active: false });
  };
  return (
    <div
      className={styles.TooltipWrapper}
      onMouseEnter={(e) => showTip(e)}
      onMouseLeave={hideTip}
      //   onClick={(e) => showTip(e)}
    >
      {children}
      {tooltipData.active && (
        <div
          className={`${styles.TooltipTip} ${direction}`}
          style={{ left: `${tooltipData.left}px`, top: `${tooltipData.top}px` }}
        >
          {content}
        </div>
      )}
    </div>
  );
}
