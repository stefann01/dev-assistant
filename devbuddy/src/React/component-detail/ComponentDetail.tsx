import React, { useState } from "react";
import Input from "../../components/Input/Input";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import Switch from "../../components/Switch/Switch";
import Toggle from "../../components/Toggle/Toggle";
import { useReactComponent } from "../../contexts/ReactComponentContext";
import { ReactComponentActions } from "../../reducers/ReactComponentReducer";
import styles from "./ComponentDetail.module.scss";

interface ComponentDetailProps {
  style?: any;
}

export default function ComponentDetail({ style }: ComponentDetailProps) {
  const { props, states, effects, isStyleModule, cssMode, name, dispatch } =
    useReactComponent();

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

      <div className={styles.toggleLine}>
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
        <SectionTitle
          title={"Props"}
          onButtonClick={() =>
            dispatch({ type: ReactComponentActions.ADD_PROP })
          }
        />
        <div className={styles.propsItems}>
          {props.map((prop, index) => (
            <div key={index} className={styles.controlsRow}>
              <Input
                value={prop.name}
                onChange={(e) =>
                  dispatch({
                    type: ReactComponentActions.EDIT_PROP,
                    payload: { index, prop: { ...prop, name: e.target.value } },
                  })
                }
              />
              <Input
                value={prop.type}
                onChange={(e) =>
                  dispatch({
                    type: ReactComponentActions.EDIT_PROP,
                    payload: { index, prop: { ...prop, type: e.target.value } },
                  })
                }
              />
              <button
                onClick={() =>
                  dispatch({
                    type: ReactComponentActions.REMOVE_PROP,
                    payload: { index },
                  })
                }
              >
                -
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.propsContainer}>
        <SectionTitle
          title={"State"}
          onButtonClick={() =>
            dispatch({ type: ReactComponentActions.ADD_STATE })
          }
        />
        <div className={styles.propsItems}>
          {states.map((s, index) => (
            <div key={index} className={styles.controlsRow}>
              <Input
                value={s.name}
                onChange={(e) =>
                  dispatch({
                    type: ReactComponentActions.EDIT_STATE,
                    payload: { state: { ...s, name: e.target.value }, index },
                  })
                }
              />
              <Input
                value={s.defaultValue}
                onChange={(e) =>
                  dispatch({
                    type: ReactComponentActions.EDIT_STATE,
                    payload: {
                      state: { ...s, defaultValue: e.target.value },
                      index,
                    },
                  })
                }
              />
              <button
                onClick={() =>
                  dispatch({
                    type: ReactComponentActions.REMOVE_STATE,
                    payload: { index },
                  })
                }
              >
                -
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.propsContainer}>
        <SectionTitle
          title={"Effects"}
          onButtonClick={() =>
            dispatch({ type: ReactComponentActions.ADD_EFFECT })
          }
        />
        <div className={styles.propsItems}>
          {effects.map((effect, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <div className={styles.effectsSwitchRow}>
                <Switch
                  style={{ width: "40px", height: "16px" }}
                  isActive={effect.hasCleanUpFunction}
                  onChange={() =>
                    dispatch({
                      type: ReactComponentActions.TOGGLE_EFFECT_CLEANUP_FUNCTION,
                      payload: { index },
                    })
                  }
                />
                <p>Cleanup function</p>
                <button
                  style={{ marginLeft: "auto" }}
                  onClick={() =>
                    dispatch({
                      type: ReactComponentActions.REMOVE_EFFECT,
                      payload: { index },
                    })
                  }
                >
                  -
                </button>
              </div>

              <div className={styles.effectsSwitchRow}>
                <Switch
                  style={{ width: "40px", height: "16px" }}
                  isActive={effect.hasDependencyArray}
                  onChange={() =>
                    dispatch({
                      type: ReactComponentActions.TOGGLE_EFFECT_DEP_ARRAY,
                      payload: { index },
                    })
                  }
                />
                <p>Dependency array</p>
              </div>

              {effect.hasDependencyArray && (
                <div className={styles.effectsSwitchRow}>
                  <Input value="" onChange={() => {}} />
                  <button>+</button>
                </div>
              )}

              <div className={styles.divider}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
