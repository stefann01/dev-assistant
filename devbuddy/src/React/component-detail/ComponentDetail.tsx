import React, { useEffect } from "react";
import Input from "../../components/Input/Input";
import Toggle from "../../components/Toggle/Toggle";
import { useReactComponent } from "../../contexts/ReactComponentContext";
import { ReactComponentActions } from "../../reducers/ReactComponentReducer";
import EffectsDetail from "../effects-detail/EffectsDetail";
import PropsDetail from "../props-detail/PropsDetail";
import StateDetail from "../state-detail/StateDetail";
import styles from "./ComponentDetail.module.scss";

interface ComponentDetailProps {
  style?: any;
}

export default function ComponentDetail({ style }: ComponentDetailProps) {
  const { isStyleModule, cssMode, name, dispatch } = useReactComponent();

  return (
    <div
      className={styles.container}
      style={{
        ...style,
      }}
    >
      <div className={styles.componentName}>
        <div className={styles.componentNameLine}>
          <label>Component name</label>
          <div className={styles.infoButton}>i</div>
        </div>
        <Input
          value={name}
          onChange={(e) =>
            dispatch({
              type: ReactComponentActions.EDIT_NAME,
              payload: { name: e.target.value },
            })
          }
        />
      </div>

      <div className={styles.styleLine}>
        <Toggle
          style={{ width: "50%" }}
          isActive={cssMode === "scss"}
          onChange={() =>
            dispatch({
              type: ReactComponentActions.CHANGE_STYLE_MODE,
              payload: { cssMode: cssMode === "css" ? "scss" : "css" },
            })
          }
        />
        <div className={styles.moduleContainer}>
          <input
            type={"checkbox"}
            checked={isStyleModule}
            onChange={() =>
              dispatch({
                type: ReactComponentActions.TOGGLE_STYLE_MODULE,
                payload: { isStyleModule: !isStyleModule },
              })
            }
          />
          <label>Module</label>
        </div>
      </div>

      <div className={styles.propsContainer}>
        <PropsDetail />
      </div>

      <div className={styles.propsContainer}>
        <StateDetail />
      </div>

      <div className={styles.propsContainer}>
        <EffectsDetail />
      </div>
    </div>
  );
}
