import React from "react";
import ComponentDetail from "../component-detail/ComponentDetail";
import styles from "./ReactComponentGenerator.module.scss";
import ClassGenerator from "../class-generator/ClassGenerator";

export default function ReactComponentGenerator() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>React class generator</h1>
      <div
        style={{
          width: "stretch",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <ComponentDetail
          style={{ width: "275px", minWidth: "275px", marginRight: "40px" }}
        />
        <ClassGenerator />
      </div>
    </div>
  );
}
