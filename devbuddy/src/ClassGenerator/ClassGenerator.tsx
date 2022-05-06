import React from "react";
import Checkbox from "../components/Checkbox/Checkbox";
import CodeTextarea from "../components/CodeTextarea/CodeTextarea";
import { useProperties } from "../contexts/PropertiesContext";
import PropertiesPanel from "../PropertiesPanel/PropertiesPanel";
import { PropertiesReducerActions } from "../reducers/PropertiesReducer";
import styles from "./ClassGenerator.module.scss";

export default function ClassGenerator() {
  const { entityType, dispatch } = useProperties();

  const changeEntityType = (entity: "interface" | "class" | "builder") => {
    dispatch({
      type: PropertiesReducerActions.CHANGE_ENTITY_TYPE,
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
            <Checkbox
              value="Class"
              checked={entityType === "class"}
              onChange={() => changeEntityType("class")}
              label={"Class"}
            />

            <Checkbox
              value="Interface"
              checked={entityType === "interface"}
              onChange={() => changeEntityType("interface")}
              label={"Interface"}
            />

            <Checkbox
              value="Builder"
              checked={entityType === "builder"}
              onChange={() => changeEntityType("builder")}
              label={"Builder"}
            />
          </div>
          <div className={styles.propertyPanelContainer}>
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
