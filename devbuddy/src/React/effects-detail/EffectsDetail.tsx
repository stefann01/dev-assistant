import React, { useMemo } from "react";
import Chip from "../../components/Chip/Chip";
import Input from "../../components/Input/Input";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import Switch from "../../components/Switch/Switch";
import { useReactComponent } from "../../contexts/ReactComponentContext";
import { ReactComponentActions } from "../../reducers/ReactComponentReducer";
import styles from "../component-detail/ComponentDetail.module.scss";
import Minus from "../../assets/svg/minus.svg";
import Plus from "../../assets/svg/Plus.svg";
import Button from "../../components/Button/Button";

export default function EffectsDetail() {
  const { effects, areEffectsVisible, dispatch } = useReactComponent();
  const [newDependencyItem, setNewDependencyItem] = React.useState({
    index: 0,
    value: "",
  });

  const items = useMemo(() => {
    const addDependency = (index: number) => {
      if (newDependencyItem.value.length === 0) return;
      dispatch({
        type: ReactComponentActions.ADD_EFFECT_DEPENDENCY,
        payload: { dependency: newDependencyItem.value, index },
      });
      setNewDependencyItem({ index: 0, value: "" });
    };

    return effects.map((effect, index) => (
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
          <div style={{ marginLeft: "auto" }}>
            <Button
              onClick={() =>
                dispatch({
                  type: ReactComponentActions.REMOVE_EFFECT,
                  payload: { index },
                })
              }
            >
              <img src={Minus} alt="Remove prop" />
            </Button>
          </div>
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
          <>
            <div className={styles.effectsSwitchRow}>
              <div style={{ marginRight: "10px" }}>
                <Input
                  value={newDependencyItem.value}
                  onChange={(e) =>
                    setNewDependencyItem({ index, value: e.target.value })
                  }
                />
              </div>
              <Button
                onClick={() => addDependency(index)}
                disabled={newDependencyItem.value.length === 0}
              >
                <img src={Plus} alt="Remove prop" />
              </Button>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                marginBottom: "10px",
              }}
            >
              {effect.depArray.map((dep, depIndex) => (
                <Chip
                  key={depIndex}
                  label={dep}
                  onClick={() => {
                    setNewDependencyItem({ index, value: dep });
                  }}
                  onDelete={() =>
                    dispatch({
                      type: ReactComponentActions.REMOVE_DEP_ARRAY_ITEM,
                      payload: { depIndex, index },
                    })
                  }
                />
              ))}
            </div>
          </>
        )}

        <div className={styles.divider}></div>
      </div>
    ));
  }, [effects, newDependencyItem.value, dispatch]);

  return (
    <>
      <SectionTitle
        title={"Effects"}
        onButtonClick={() =>
          dispatch({ type: ReactComponentActions.ADD_EFFECT })
        }
        onShowHide={() => {
          dispatch({
            type: ReactComponentActions.TOGGLE_SECTION_VISIBILITY,
            payload: { section: "effects" },
          });
        }}
        isShow={areEffectsVisible}
      />
      <div className={styles.propsItems}>{areEffectsVisible && items}</div>
    </>
  );
}
