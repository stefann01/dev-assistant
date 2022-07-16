import React, { useMemo } from "react";
import {
  TSInterfaceTemplate,
  TSTemplate,
} from "../../CodeTemplates/CodeTemplates";
import { useProperties } from "../../contexts/PropertiesContext";
import Button from "../Button/Button";
import styles from "./CodeTextarea.module.scss";
import { ReactComponent as CodeDownloadIcon } from "../../assets/svg/code-download.svg";
import { getValidVariableName } from "../../helper/helper";
import { DEFAULT_ENTITY_NAME } from "../../helper/constants";
import { downloadFile } from "../../helper/helper";

export default function CodeTextarea() {
  const { properties, entityType, entityName } = useProperties();

  const displayedCode = useMemo(() => {
    if (entityType === "class" || entityType === "builder")
      return TSTemplate({
        entityName: getValidVariableName(entityName, DEFAULT_ENTITY_NAME),
        properties,
        entityType,
      });
    if (entityType === "interface")
      return TSInterfaceTemplate({
        entityName: getValidVariableName(entityName, DEFAULT_ENTITY_NAME),
        properties,
      });
    return "";
  }, [entityName, entityType, properties]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button
          onClick={() =>
            downloadFile(
              getValidVariableName(entityName, DEFAULT_ENTITY_NAME),
              `${displayedCode}.ts`
            )
          }
          style={{ marginLeft: "10px" }}
        >
          <CodeDownloadIcon />
        </Button>
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
