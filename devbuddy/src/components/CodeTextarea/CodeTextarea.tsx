import React, { useMemo } from "react";
import {
  TSInterfaceTemplate,
  TSTemplate,
} from "../../CodeTemplates/CodeTemplates";
import { useProperties } from "../../contexts/PropertiesContext";
import styles from "./CodeTextarea.module.scss";

export default function CodeTextarea() {
  const { properties, entityType } = useProperties();

  const displayedCode = useMemo(() => {
    if (entityType === "class" || entityType === "builder")
      return TSTemplate({
        entityName: "MyClassname", //TODO: This should be replaced with the name of the entity onced added into the context.
        properties,
        entityType,
      });
    if (entityType === "interface")
      return TSInterfaceTemplate({ entityName: "MyInterface", properties }); //TODO: This should be replaced with the name of the entity onced added into the context.
    return "";
  }, [entityType, properties]);

  const downloadFile = () => {
    const element = document.createElement("a");
    const file = new Blob([displayedCode], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `EntityName.ts`; //TODO: This should be replaced with the name of the entity onced added into the context.
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    element.remove();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.downloadButton} onClick={downloadFile}>
          D
        </button>
      </div>
      <div className={styles.content}>
        <blockquote>
          <pre>
            <code>{displayedCode}</code>
          </pre>
        </blockquote>
      </div>
    </div>
  );
}
