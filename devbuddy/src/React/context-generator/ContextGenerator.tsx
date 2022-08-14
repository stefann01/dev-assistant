import React, { useState } from "react";
import Tab from "../../components/Tab/Tab";
import styles from "./ContextGenerator.module.scss";
import { ReactComponent as ReactLogo } from "../../assets/svg/react_logo.svg";
import { useReactContext } from "../../contexts/ReactContextContext";
import { getValidComponentName } from "../../helper/helper";
import {
  ReactContextActionsTemplate,
  ReactContextReducerTemplate,
  ReactContextTemplate,
} from "../../CodeTemplates/ReactContextTemplates";
import ContextDetail from "../context-detail/ContextDetail";

export default function ContextGenerator() {
  const [activeTab, setActiveTab] = useState<"context" | "reducer" | "actions">(
    "context"
  );
  const { name, actions, props, stateName } = useReactContext();
  const validatedName = getValidComponentName(name);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>React context generator</h1>
      <div className={styles.content}>
        <div className={styles.codContainer}>
          <div className={styles.tabContainer}>
            <Tab
              onClick={() => setActiveTab("context")}
              title={validatedName + ".context.tsx"}
              isActive={activeTab === "context"}
              logo={<ReactLogo />}
            />

            <Tab
              onClick={() => setActiveTab("reducer")}
              title={`${validatedName}.reducer.ts`}
              isActive={activeTab === "reducer"}
              logo={<ReactLogo />}
            />

            <Tab
              onClick={() => setActiveTab("actions")}
              title={`${validatedName}.actions.tsx`}
              isActive={activeTab === "actions"}
              logo={<ReactLogo />}
            />
          </div>
          <div className={styles.tabContent}>
            {activeTab === "context" && (
              <blockquote>
                <pre>
                  <code>
                    {ReactContextTemplate({
                      name: validatedName,
                      actions,
                      props,
                      stateName,
                    })}
                  </code>
                </pre>
              </blockquote>
            )}
            {activeTab === "actions" && (
              <blockquote>
                <pre>
                  <code>{ReactContextActionsTemplate({ name, actions })}</code>
                </pre>
              </blockquote>
            )}
            {activeTab === "reducer" && (
              <blockquote>
                <pre>
                  <code>{ReactContextReducerTemplate({ name, actions })}</code>
                </pre>
              </blockquote>
            )}
          </div>
        </div>
        <div style={{ minWidth: "275px" }}>
          <ContextDetail />
        </div>
      </div>
    </div>
  );
}
