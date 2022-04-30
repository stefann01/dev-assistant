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
import { isValidDependencyArrayItem } from "../../helper/helper";

export default function EffectsDetail() {
  const { effects, areEffectsVisible, dispatch } = useReactComponent();
  const [newDependencyItems, setNewDependencyItems] = React.useState([
    {
      index: 0,
      value: "",
    },
  ]);

  const items = useMemo(() => {
    const addDependency = (index: number) => {
      if (newDependencyItems[index].value.length === 0) return;
      if (isValidDependencyArrayItem(newDependencyItems[index].value)) {
        dispatch({
          type: ReactComponentActions.ADD_EFFECT_DEPENDENCY,
          payload: { dependency: newDependencyItems[index].value, index },
        });
        setNewDependencyItems([...newDependencyItems, { index: 0, value: "" }]);
      }
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
                  value={newDependencyItems[index].value}
                  onChange={(e) => {
                    const items = [...newDependencyItems];
                    items[index].value = e.target.value;
                    setNewDependencyItems(items);
                  }}
                />
              </div>
              <Button
                onClick={() => addDependency(index)}
                disabled={newDependencyItems[index].value.length === 0}
              >
                <img src={Plus} alt="Remove prop" />
              </Button>
            </div>

            {effect.depArray.length > 0 && (
              <div className={styles.chipsContainer}>
                {effect.depArray.map((dep, depIndex) => (
                  <Chip
                    key={depIndex}
                    label={dep}
                    onClick={() => {
                      const items = [...newDependencyItems];
                      items[index].value = dep;
                      setNewDependencyItems(items);
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
            )}
          </>
        )}

        <div className={styles.divider}></div>
      </div>
    ));
  }, [effects, newDependencyItems, dispatch]);

  return (
    <>
      <SectionTitle
        title={"Effects"}
        onButtonClick={() => {
          dispatch({ type: ReactComponentActions.ADD_EFFECT });
          setNewDependencyItems([
            ...newDependencyItems,
            { index: newDependencyItems.length, value: "" },
          ]);
        }}
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
