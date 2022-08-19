import React, { useMemo } from "react";
import Input from "../../components/Input/Input";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { useReactComponent } from "../../contexts/ReactComponentContext";
import { ReactComponentActions } from "../../reducers/ReactComponentReducer";
import styles from "../component-detail/ComponentDetail.module.scss";
import { ReactComponent as Minus } from "../../assets/svg/minus.svg";
import Button from "../../components/Button/Button";
import Autocomplete from "../../components/Autocomplete/Autocomplete";

export default function PropsDetail() {
  const { props, arePropsVisible, dispatch } = useReactComponent();

  const items = useMemo(() => {
    return props.map((prop, index) => (
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
                    name: e.target.value,
                  },
                },
              })
            }
          />
        </div>
        <div className={styles.rowItem}>
          <Autocomplete
            value={prop.type}
            options={["string", "number", "boolean", "any", "void"]}
            onChange={(value) =>
              dispatch({
                type: ReactComponentActions.EDIT_PROP,
                payload: {
                  index,
                  prop: {
                    ...prop,
                    type: value,
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
              type: ReactComponentActions.REMOVE_PROP,
              payload: { index },
            })
          }
        >
          <Minus />
        </Button>
      </div>
    ));
  }, [dispatch, props]);

  return (
    <>
      <SectionTitle
        title={"Props"}
        onButtonClick={() => dispatch({ type: ReactComponentActions.ADD_PROP })}
        isShow={arePropsVisible}
        onShowHide={() => {
          dispatch({
            type: ReactComponentActions.TOGGLE_SECTION_VISIBILITY,
            payload: { section: "props" },
          });
        }}
      />
      <div className={styles.propsItems}>{arePropsVisible && <>{items}</>}</div>
    </>
  );
}
