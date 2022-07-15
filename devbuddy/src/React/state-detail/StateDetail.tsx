import React, { useMemo } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { useReactComponent } from "../../contexts/ReactComponentContext";
import { ReactComponentActions } from "../../reducers/ReactComponentReducer";
import styles from "../component-detail/ComponentDetail.module.scss";
import Minus from "../../assets/svg/minus.svg";

export default function StateDetail() {
  const { states, areStatesVisible, dispatch } = useReactComponent();
  const items = useMemo(() => {
    return states.map((s, index) => (
      <div
        key={index}
        style={{ width: "stretch", display: "flex", flexDirection: "column" }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            marginBottom: "10px",
          }}
        >
          <Input
            value={s.name}
            onChange={(e) =>
              dispatch({
                type: ReactComponentActions.EDIT_STATE,
                payload: { state: { ...s, name: e.target.value }, index },
              })
            }
          />
          <div style={{ marginLeft: "10px" }}>
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
        </div>
        <div className={styles.rowItem}>
          <textarea
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
      </div>
    ));
  }, [dispatch, states]);

  return (
    <>
      <SectionTitle
        title={"State"}
        onButtonClick={() =>
          dispatch({ type: ReactComponentActions.ADD_STATE })
        }
        onShowHide={() => {
          dispatch({
            type: ReactComponentActions.TOGGLE_SECTION_VISIBILITY,
            payload: { section: "states" },
          });
        }}
        isShow={areStatesVisible}
        showInfo={true}
        info={"TIP: You can format you state as a stringified json object."}
      />
      <div className={styles.propsItems}>{areStatesVisible && items}</div>
    </>
  );
}
