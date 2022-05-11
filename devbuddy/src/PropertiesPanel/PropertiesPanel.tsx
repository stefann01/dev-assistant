import React from "react";
import styles from "./PropertiesPanel.module.scss";
import { useProperties } from "../contexts/PropertiesContext";
import { PropertiesReducerActions } from "../reducers/PropertiesReducer";
import Property from "../Models/Properties.model";
import SectionTitle from "../components/SectionTitle/SectionTitle";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import Select from "../components/Select/select";
import { ReactComponent as MinusIcon } from "../assets/svg/minus.svg";
import Divider from "../components/Divider/Divider";
import Autocomplete from "../components/Autocomplete/Autocomplete";
import { ReactComponent as FunctionIcon } from "../assets/svg/Function.svg";
import { ReactComponent as NonFunctionIcon } from "../assets/svg/NonFunction.svg";
import { ReactComponent as StaticIcon } from "../assets/svg/Static.svg";
import { ReactComponent as NonStaticIcon } from "../assets/svg/NonStatic.svg";
import { ReactComponent as Readonly } from "../assets/svg/Readonly.svg";
import { ReactComponent as NonReadonly } from "../assets/svg/NonReadonly.svg";

export default function PropertiesPanel() {
  const { dispatch, properties, entityType, entityName } = useProperties();

  const addProperty = () =>
    dispatch({ type: PropertiesReducerActions.ADD_PROPERTY });

  const removeProperty = (index: number) =>
    dispatch({
      type: PropertiesReducerActions.REMOVE_PROPERTY,
      payload: { index },
    });

  const editProperty = (index: number, newProperty: Property) =>
    dispatch({
      type: PropertiesReducerActions.EDIT_PROPERTY,
      payload: { index, newProperty },
    });

  const changeEntityName = (name: string) => {
    dispatch({
      type: PropertiesReducerActions.CHANGE_ENTITY_NAME,
      payload: { entityName: name },
    });
  };

  return (
    <div className={styles.container}>
      <SectionTitle title="Properties" onButtonClick={addProperty} />

      <div className={styles.body}>
        <div style={{ marginTop: "10px" }}>
          <label className={styles.entityLabel}>Entity Name</label>
          <Input
            style={{ marginTop: "5px" }}
            onChange={(e) => changeEntityName(e.target.value)}
            value={entityName}
          />
        </div>
        <Divider style={{ height: "16px" }} />

        {properties &&
          properties.map((prop, index) => (
            <div className={styles.propValuesContainer} key={index}>
              <div className={styles.propValuesContainerRow}>
                <Button
                  style={{ width: "32px", height: "32px", marginRight: "8px" }}
                  onClick={() =>
                    editProperty(index, {
                      ...prop,
                      isFunction: !prop.isFunction,
                    })
                  }
                >
                  {prop.isFunction ? <FunctionIcon /> : <NonFunctionIcon />}
                </Button>

                {entityType !== "interface" && (
                  <Button
                    style={{
                      width: "32px",
                      height: "32px",
                      marginRight: "8px",
                    }}
                    onClick={() =>
                      editProperty(index, { ...prop, isStatic: !prop.isStatic })
                    }
                  >
                    {prop.isStatic ? <StaticIcon /> : <NonStaticIcon />}
                  </Button>
                )}

                <Button
                  style={{ width: "32px", height: "32px", marginRight: "8px" }}
                  disabled={prop.isFunction}
                  onClick={() =>
                    editProperty(index, {
                      ...prop,
                      isReadonly: !prop.isReadonly,
                    })
                  }
                >
                  {prop.isReadonly ? <Readonly /> : <NonReadonly />}
                </Button>

                {entityType !== "interface" && (
                  <>
                    <Select
                      options={["private", "public", "protected"]}
                      placeholder="Select an access modifier"
                      value={prop.access}
                      onChange={(option) =>
                        editProperty(index, {
                          ...prop,
                          access: option,
                        })
                      }
                    ></Select>
                  </>
                )}
              </div>
              <div className={styles.propValuesContainerRow}>
                <Input
                  style={{ marginRight: "8px" }}
                  value={prop.name}
                  onChange={(e) =>
                    editProperty(index, {
                      ...prop,
                      name: e.target.value.replace(/\s/g, ""),
                    })
                  }
                />
                <Autocomplete
                  value={prop.type}
                  style={{
                    marginRight: "8px",
                    position: "relative",
                    width: "100%",
                  }}
                  options={["string", "number", "boolean", "any"]}
                  onChange={(value) =>
                    editProperty(index, {
                      ...prop,
                      type: value.replace(/\s/g, ""),
                    })
                  }
                />
                <Button
                  style={{
                    width: "32px",
                    height: "32px",
                  }}
                  onClick={() => removeProperty(index)}
                >
                  <MinusIcon />
                </Button>
              </div>
              <Divider style={{ height: "16px" }} />
            </div>
          ))}
      </div>
    </div>
  );
}
