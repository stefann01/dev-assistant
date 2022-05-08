import React from "react";
import styles from "./NavItem.module.scss";
interface NavItemProps {
  title: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  isCollapsed?: boolean;
}
export default function NavItem({
  title,
  onClick,
  icon,
  isCollapsed,
}: NavItemProps) {
  return (
    <div
      className={`${styles.container} ${
        isCollapsed ? styles.containerCollapsed : styles.containerExpanded
      }`}
      onClick={onClick}
    >
      {isCollapsed && icon}
      {!isCollapsed && <p className={styles.title}> {title}</p>}
    </div>
  );
}
