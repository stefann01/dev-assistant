import React from "react";
import styles from "./NavItem.module.scss";
interface NavItemProps {
  title: string;
  onClick?: () => void;
}
export default function NavItem({ title, onClick }: NavItemProps) {
  return (
    <div className={styles.container} onClick={onClick}>
      <p className={styles.title}> {title}</p>
    </div>
  );
}
