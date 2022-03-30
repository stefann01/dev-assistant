import React from "react";
import styles from "./PropertiesPanel.module.scss";
import Plus from "../assets/svg/Plus.svg";
import { useProperties } from "../contexts/PropertiesContext";
import { PropertiesReducerActions } from "../reducers/PropertiesReducer";
import Property from "../Models/Properties.model";
export default function PropertiesPanel() {
  const { dispatch, properties, entityType } = useProperties();

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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        Properties
        <button className={styles.button} onClick={addProperty}>
          <img src={Plus} alt="Add property" />
        </button>
      </div>
      <div className={styles.body}>
        {properties &&
          properties.map((prop, index) => (
            <div className={styles.propValuesContainer} key={index}>
              <button
                className={styles.removeBtn}
                onClick={() =>
                  editProperty(index, { ...prop, isFunction: !prop.isFunction })
                }
              >
                {prop.isFunction ? (
                  "f"
                ) : (
                  <span style={{ textDecoration: "line-through" }}>f</span>
                )}
              </button>

              {entityType !== "interface" && (
                <button
                  className={styles.removeBtn}
                  onClick={() =>
                    editProperty(index, { ...prop, isStatic: !prop.isStatic })
                  }
                >
                  {prop.isStatic ? (
                    "S"
                  ) : (
                    <span style={{ textDecoration: "line-through" }}>S</span>
                  )}
                </button>
              )}

              <button
                className={styles.removeBtn}
                disabled={prop.isFunction}
                onClick={() =>
                  editProperty(index, { ...prop, isReadonly: !prop.isReadonly })
                }
              >
                {prop.isReadonly ? (
                  "R"
                ) : (
                  <span
                    style={{
                      textDecoration: !prop.isReadonly
                        ? "line-through"
                        : "none",
                    }}
                  >
                    R
                  </span>
                )}
              </button>

              {entityType !== "interface" && (
                <select
                  value={prop.access}
                  onChange={(e) =>
                    editProperty(index, {
                      ...prop,
                      access: e.target.value as
                        | "public"
                        | "private"
                        | "protected",
                    })
                  }
                >
                  <option value={"public"}>public</option>
                  <option value={"protected"}>protected</option>
                  <option value={"private"}>private</option>
                </select>
              )}

              <input
                className={styles.propertyElement}
                value={prop.name}
                onChange={(e) =>
                  editProperty(index, {
                    ...prop,
                    name: e.target.value.replace(/\s/g, ""),
                  })
                }
              />
              <input
                className={styles.propertyElement}
                value={prop.type}
                onChange={(e) =>
                  editProperty(index, {
                    ...prop,
                    type: e.target.value.replace(/\s/g, ""),
                  })
                }
              />
              <button
                className={styles.removeBtn}
                onClick={() => removeProperty(index)}
              >
                -
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
