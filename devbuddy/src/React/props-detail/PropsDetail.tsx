import React from "react";
import Input from "../../components/Input/Input";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { useReactComponent } from "../../contexts/ReactComponentContext";
import { ReactComponentActions } from "../../reducers/ReactComponentReducer";
import styles from "../component-detail/ComponentDetail.module.scss";
import Minus from "../../assets/svg/minus.svg";
import Button from "../../components/Button/Button";
import { isValidVariableName, isValidTypeName } from "../../helper/helper";

export default function PropsDetail() {
  const { props, arePropsVisible, dispatch } = useReactComponent();

  return (
    <>
      <SectionTitle
        title={"Props"}
        onButtonClick={() => dispatch({ type: ReactComponentActions.ADD_PROP })}
      />
      <div className={styles.propsItems}>
        {props.map((prop, index) => (
          <div key={index} className={styles.controlsRow}>
            <div className={styles.rowItem}>
              <Input
                value={prop.name}
                onChange={(e) =>
                  dispatch({
                    type: ReactComponentActions.EDIT_PROP,
                    payload: {
                      index,
                      prop: {
                        ...prop,
                        name: isValidVariableName(e.target.value)
                          ? e.target.value
                          : "newProp",
                      },
                    },
                  })
                }
              />
            </div>
            <div className={styles.rowItem}>
              <Input
                value={prop.type}
                onChange={(e) =>
                  dispatch({
                    type: ReactComponentActions.EDIT_PROP,
                    payload: {
                      index,
                      prop: {
                        ...prop,
                        type: isValidTypeName(e.target.value)
                          ? e.target.value
                          : "type",
                      },
                    },
                  })
                }
              />
            </div>
            <Button
              onClick={() =>
                dispatch({
                  type: ReactComponentActions.REMOVE_PROP,
                  payload: { index },
                })
              }
            >
              <img src={Minus} alt="Remove prop" />
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
