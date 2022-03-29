import React from "react";
import Divider from "../Divider/Divider";
import styles from "./NavSectionTitle.module.scss";

interface NavSectionTitleProps {
  title: string;
}

export default function NavSectionTitle({ title }: NavSectionTitleProps) {
  return (
    <div className={styles.container}>
      <Divider />
      <p className={styles.title}>{title}</p>
      <Divider />
    </div>
  );
}
