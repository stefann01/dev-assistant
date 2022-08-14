import React, { useMemo } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { useReactContext } from "../../contexts/ReactContextContext";
import { ReactContextActions } from "../../reducers/ReactContextReducer";
import { ReactComponent as MinusIcon } from "../../assets/svg/minus.svg";

export default function ActionsDetails() {
  const { actions, dispatch } = useReactContext();

  return (
    <>
      <SectionTitle
        title={"Actions"}
        onButtonClick={() => dispatch({ type: ReactContextActions.ADD_ACTION })}
        isShow={true}
        onShowHide={() => {}}
      />
      <div>
        {true && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              border: "1px solid #e0e0e0",
              borderTop: "none",
              marginBottom: "16px",
              paddingBottom: "10px",
              minHeight: "30px",
            }}
          >
            {actions.map((action, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    margin: "10px 10px 0px 10px",
                  }}
                >
                  <Input
                    value={action}
                    onChange={(e) => {
                      dispatch({
                        type: ReactContextActions.EDIT_ACTION_NAME,
                        payload: { index, name: e.target.value },
                      });
                    }}
                  />
                  <Button
                    style={{
                      width: "32px",
                      height: "32px",
                      marginLeft: "10px",
                    }}
                    onClick={() =>
                      dispatch({
                        type: ReactContextActions.REMOVE_ACTION,
                        payload: { index },
                      })
                    }
                  >
                    <MinusIcon />
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
