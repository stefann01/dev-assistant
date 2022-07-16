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
  direction = "right",
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
      let x = 0;
      let y = 0;
      switch (direction) {
        case "left":
          x = coords.top + coords.height / 2;
          y = coords.left - gap;
          break;
        case "right":
          x = coords.top + coords.height / 2;
          y = coords.left + coords.width + gap;
          break;
        case "top":
          x = coords.top - gap;
          y = coords.left + coords.width / 2;
          break;
        case "bottom":
          x = coords.top + coords.height + gap;
          y = coords.left + coords.width / 2;
          break;
        default:
          break;
      }
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
      // onClick={(e) => showTip(e)}
    >
      {children}
      {tooltipData.active && (
        <div
          className={`${styles.TooltipTip} ${styles[direction]}`}
          style={{ left: `${tooltipData.left}px`, top: `${tooltipData.top}px` }}
        >
          {content}
        </div>
      )}
    </div>
  );
}
