import React from "react";
import {
  TSInterfaceTemplate,
  TSTemplate,
} from "../../CodeTemplates/CodeTemplates";
import { useProperties } from "../../contexts/PropertiesContext";
import styles from "./CodeTextarea.module.scss";

export default function CodeTextarea() {
  const { properties, entityType } = useProperties();
  return (
    <div className={styles.container}>
      <div className={styles.header}></div>
      <div className={styles.content}>
        <blockquote>
          <pre>
            <code>
              {entityType === "class" &&
                TSTemplate({
                  clasName: "My Classname",
                  properties,
                })}

              {entityType === "interface" &&
                TSInterfaceTemplate({ properties })}
            </code>
          </pre>
        </blockquote>
      </div>
    </div>
  );
}
