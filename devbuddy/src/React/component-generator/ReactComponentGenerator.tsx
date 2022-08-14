import React from "react";
import ComponentDetail from "../component-detail/ComponentDetail";
import styles from "./ReactComponentGenerator.module.scss";
import ClassGenerator from "../class-generator/ClassGenerator";

export default function ReactComponentGenerator() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>React class generator</h1>
      <div className={styles.content}>
        <ClassGenerator />
        <ComponentDetail
          style={{
            height: "100%",
            maxHeight: "100%",
            width: "275px",
            minWidth: "275px",
            marginRight: "40px",
            marginBottom: "20px",
            borderRadius: "10px",
          }}
        />
      </div>
    </div>
  );
}
