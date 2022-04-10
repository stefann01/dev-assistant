import React, { useState } from "react";
import { ReactComponentTestTemplate } from "../../CodeTemplates/CodeTemplates";
import { ReactComponentTemplate } from "../../CodeTemplates/ReactComponentTemplate";
import { useReactComponent } from "../../contexts/ReactComponentContext";
import { capitalize } from "../../helper/helper";
import styles from "./ClassGenerator.module.scss";
import Copy from "../../assets/svg/Copy.svg";
import Download from "../../assets/svg/Download.svg";
import Button from "../../components/Button/Button";

export default function ClassGenerator() {
  const { name, props, states, effects, isStyleModule, cssMode } =
    useReactComponent();
  const [activeTab, setActiveTab] = useState<"component" | "style" | "test">(
    "component"
  );
  return (
    <div className={styles.container}>
      <div className={styles.tabContainer}>
        <div
          role="tab"
          className={`${styles.tab} ${
            activeTab === "component" && styles.activeTab
          }`}
          onClick={() => setActiveTab("component")}
        >
          {capitalize(name) || "MyComponent"}.tsx
          <span className={styles.tabIcons}>
            <Button
              style={{ width: "32px", height: "32px", marginRight: "5px" }}
            >
              <span className={styles.tabIcon}>
                <img src={Copy} alt="Copy file" />
              </span>
            </Button>
            <Button
              style={{ width: "32px", height: "32px", marginRight: "5px" }}
            >
              <span className={styles.tabIcon}>
                <img src={Download} alt="Download file" />
              </span>
            </Button>
          </span>
        </div>
        <div
          role="tab"
          className={`${styles.tab} ${
            activeTab === "style" && styles.activeTab
          }`}
          onClick={() => setActiveTab("style")}
        >
          {name}.{isStyleModule ? "module." : ""}
          {cssMode}
          <span className={styles.tabIcons}>
            <Button
              style={{ width: "32px", height: "32px", marginRight: "5px" }}
            >
              <span className={styles.tabIcon}>
                <img src={Copy} alt="Copy file" />
              </span>
            </Button>
            <Button
              style={{ width: "32px", height: "32px", marginRight: "5px" }}
            >
              <span className={styles.tabIcon}>
                <img src={Download} alt="Download file" />
              </span>
            </Button>
          </span>
        </div>
        <div
          role="tab"
          className={`${styles.tab} ${
            activeTab === "test" && styles.activeTab
          }`}
          onClick={() => setActiveTab("test")}
        >
          {name}.test.tsx
        </div>
      </div>
      <div>
        {activeTab === "component" && (
          <blockquote>
            <pre>
              <code>
                {ReactComponentTemplate({
                  name,
                  props,
                  states,
                  effects,
                  cssMode,
                  isStyleModule,
                })}
              </code>
            </pre>
          </blockquote>
        )}

        {activeTab === "test" && (
          <blockquote>
            <pre>
              <code>
                {ReactComponentTestTemplate({
                  name,
                  props,
                })}
              </code>
            </pre>
          </blockquote>
        )}
      </div>
    </div>
  );
}
