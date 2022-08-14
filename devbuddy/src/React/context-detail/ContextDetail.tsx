import React from "react";
import InfoChip from "../../components/InfoChip/InfoChip";
import Input from "../../components/Input/Input";
import { useReactContext } from "../../contexts/ReactContextContext";
import { ReactContextActions } from "../../reducers/ReactContextReducer";
import ActionsDetail from "../actions-detail/actions-detail";
import styles from "./ContextDetail.module.scss";
import { ReactComponent as MinusIcon } from "../../assets/svg/minus.svg";
import Button from "../../components/Button/Button";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import Autocomplete from "../../components/Autocomplete/Autocomplete";
import Textarea from "../../components/Textarea/Textarea";

export default function ContextDetail() {
  const { name, actions, props, stateName, dispatch } = useReactContext();
  return (
    <div
      style={{
        background: "#212121",
        padding: "10px",
        borderRadius: "5px",
        height: "calc(100% - 20px)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: " 16px",
        }}
      >
        <div style={{ display: "flex", marginBottom: " 1px" }}>
          <label>Context name</label>
          <span style={{ marginLeft: "auto", display: "flex" }}>
            <InfoChip info={"Your context name here"} />
          </span>
        </div>
        <Input
          value={name}
          onChange={(e) =>
            dispatch({
              type: ReactContextActions.EDIT_NAME,
              payload: { name: e.target.value },
            })
          }
        />
      </div>
      <div style={{ height: "100%", overflow: "auto" }}>
        <ActionsDetail />

        <SectionTitle
          title={"Properties"}
          onButtonClick={() => dispatch({ type: ReactContextActions.ADD_PROP })}
          isShow={true}
          onShowHide={() => {}}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            border: "1px solid #000000",
            borderRadius: "5px",
            borderTop: "none",
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
          }}
        >
          <Input value={stateName} style={{ marginBottom: "10px" }} />
          {props.map((prop, index) => (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: " 10px",
                }}
              >
                <Input
                  style={{ marginRight: "10px" }}
                  value={prop.name}
                  onChange={(e) =>
                    dispatch({
                      type: ReactContextActions.EDIT_PROP,
                      payload: {
                        prop: { ...prop, name: e.target.value },
                        index,
                      },
                    })
                  }
                />
                <Autocomplete
                  value={prop.type}
                  style={{
                    position: "relative",
                    width: "100%",
                  }}
                  options={["string", "number", "boolean", "any"]}
                  onChange={(value) =>
                    dispatch({
                      type: ReactContextActions.EDIT_PROP,
                      payload: { prop: { ...prop, type: value }, index },
                    })
                  }
                />
                <Button
                  style={{
                    width: "32px",
                    height: "32px",
                    marginLeft: "10px",
                  }}
                  onClick={() =>
                    dispatch({
                      type: ReactContextActions.REMOVE_PROP,
                      payload: { index },
                    })
                  }
                >
                  <MinusIcon />
                </Button>
              </div>
              <Textarea
                value={prop.defaultValue}
                onChange={(e) =>
                  dispatch({
                    type: ReactContextActions.EDIT_PROP,
                    payload: {
                      prop: { ...prop, defaultValue: e.target.value },
                      index,
                    },
                  })
                }
                resize={"vertical"}
              />
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
