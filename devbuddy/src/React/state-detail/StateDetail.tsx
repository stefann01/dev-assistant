import React from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { useReactComponent } from "../../contexts/ReactComponentContext";
import { ReactComponentActions } from "../../reducers/ReactComponentReducer";
import styles from "../component-detail/ComponentDetail.module.scss";
import Minus from "../../assets/svg/minus.svg";

export default function StateDetail() {
  const { states, dispatch } = useReactComponent();
  return (
    <>
      <SectionTitle
        title={"State"}
        onButtonClick={() =>
          dispatch({ type: ReactComponentActions.ADD_STATE })
        }
      />
      <div className={styles.propsItems}>
        {states.map((s, index) => (
          <div key={index} className={styles.controlsRow}>
            <div className={styles.rowItem}>
              <Input
                value={s.name}
                onChange={(e) =>
                  dispatch({
                    type: ReactComponentActions.EDIT_STATE,
                    payload: { state: { ...s, name: e.target.value }, index },
                  })
                }
              />
            </div>
            <div className={styles.rowItem}>
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
            </div>
            <Button
              onClick={() =>
                dispatch({
                  type: ReactComponentActions.REMOVE_STATE,
                  payload: { index },
                })
              }
            >
              <img src={Minus} alt="Remove state" />
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
