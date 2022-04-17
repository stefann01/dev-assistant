import React from "react";

import styles from "./Tab.module.scss";

interface TabProps {
  title: string;
  logo?: React.ReactNode;
  onClick: () => void;
  isActive: boolean;
}

const Tab = ({ title, logo, onClick, isActive }: TabProps) => {
  return (
    <div
      role={"tab"}
      className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
      onClick={onClick}
    >
      {logo && <span className={styles.logo}> {logo}</span>} {title}
    </div>
  );
};

export default Tab;
