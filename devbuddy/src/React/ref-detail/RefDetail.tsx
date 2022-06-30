import React, { useMemo } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { useReactComponent } from "../../contexts/ReactComponentContext";
import { ReactComponentActions } from "../../reducers/ReactComponentReducer";
import { ReactComponent as Minus } from "../../assets/svg/minus.svg";
import styles from "../component-detail/ComponentDetail.module.scss";

export default function RefDetail() {
  const { refs, areRefsVisible, dispatch } = useReactComponent();

  const items = useMemo(() => {
    return refs.map((ref, index) => {
      return (
        <div key={index} className={styles.controlsRow}>
          <div className={styles.rowItem}>
            <Input
              value={ref.name}
              onChange={(e) =>
                dispatch({
                  type: ReactComponentActions.EDIT_REF,
                  payload: {
                    index,
                    ref: {
                      ...ref,
                      name: e.target.value,
                    },
                  },
                })
              }
            />
          </div>
          <div className={styles.rowItem}>
            <Input
              value={ref.defaultValue}
              onChange={(e) =>
                dispatch({
                  type: ReactComponentActions.EDIT_REF,
                  payload: {
                    index,
                    ref: {
                      ...ref,
                      defaultValue: e.target.value,
                    },
                  },
                })
              }
            />
          </div>
          <Button
            style={{ width: "32px", height: "32px" }}
            onClick={() =>
              dispatch({
                type: ReactComponentActions.REMOVE_REF,
                payload: { index },
              })
            }
          >
            <Minus />
          </Button>
        </div>
      );
    });
  }, [dispatch, refs]);

  return (
    <>
      <SectionTitle
        title={"Refs"}
        onButtonClick={() => dispatch({ type: ReactComponentActions.ADD_REF })}
        isShow={areRefsVisible}
        onShowHide={() => {
          dispatch({
            type: ReactComponentActions.TOGGLE_SECTION_VISIBILITY,
            payload: { section: "refs" },
          });
        }}
      ></SectionTitle>
      <div className={styles.propsItems}>{areRefsVisible && <>{items}</>}</div>
    </>
  );
}
