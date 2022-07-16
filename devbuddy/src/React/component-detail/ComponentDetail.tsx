import React from "react";
import InfoChip from "../../components/InfoChip/InfoChip";
import Input from "../../components/Input/Input";
import Toggle from "../../components/Toggle/Toggle";
import { useReactComponent } from "../../contexts/ReactComponentContext";
import { ReactComponentActions } from "../../reducers/ReactComponentReducer";
import EffectsDetail from "../effects-detail/EffectsDetail";
import PropsDetail from "../props-detail/PropsDetail";
import RefDetail from "../ref-detail/RefDetail";
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
          <span style={{ marginLeft: "auto", display: "flex" }}>
            <InfoChip info={"You component name here"} />
          </span>
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
          firstLabel="CSS"
          secondLabel="SCSS"
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
          {/* TODO: Replace this with a checkbox component once created. */}
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

      <div className={styles.propsContainer}>
        <RefDetail />
      </div>
    </div>
  );
}
