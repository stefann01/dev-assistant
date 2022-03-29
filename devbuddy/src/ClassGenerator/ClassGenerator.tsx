import React from "react";
import CodeTextarea from "../components/CodeTextarea/CodeTextarea";
import { useProperties } from "../contexts/PropertiesContext";
import PropertiesPanel from "../PropertiesPanel/PropertiesPanel";
import { PropertiesReducerActions } from "../reducers/PropertiesReducer";
import styles from "./ClassGenerator.module.scss";

export default function ClassGenerator() {
  const { entityType, dispatch } = useProperties();

  const changeEntity = (entity: "interface" | "class" | "builder") => {
    dispatch({
      type: PropertiesReducerActions.CHANGE_ENTITY,
      payload: { entityType: entity },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Auto generated Class / Interface / Builder</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.leftSide}>
          <div className={styles.checkboxesContainer}>
            <input
              type="checkbox"
              value="Class"
              checked={entityType === "class"}
              onChange={() => changeEntity("class")}
            />
            <label>Class</label>

            <input
              type="checkbox"
              value="Interface"
              checked={entityType === "interface"}
              onChange={() => changeEntity("interface")}
            />
            <label>Interface</label>

            <input
              type="checkbox"
              value="Builder"
              checked={entityType === "builder"}
              onChange={() => changeEntity("builder")}
            />
            <label>Builder</label>
          </div>
          <div style={{ height: "100%", width: "100%" }}>
            <PropertiesPanel />
          </div>
        </div>
        <div className={styles.rightSide}>
          <CodeTextarea />
        </div>
      </div>
    </div>
  );
}
