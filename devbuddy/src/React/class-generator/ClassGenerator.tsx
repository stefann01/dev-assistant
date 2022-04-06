import React, { useState } from "react";
import {
  ReactComponentTemplate,
  ReactComponentTestTemplate,
} from "../../CodeTemplates/CodeTemplates";
import { useReactComponent } from "../../contexts/ReactComponentContext";
import { capitalize } from "../../helper/helper";
import styles from "./ClassGenerator.module.scss";

export default function ClassGenerator() {
  const { name, props, states, isStyleModule, cssMode } = useReactComponent();
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
