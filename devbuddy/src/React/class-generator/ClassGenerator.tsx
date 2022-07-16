import React, { useState } from "react";
import { ReactComponentTestTemplate } from "../../CodeTemplates/CodeTemplates";
import { ReactComponentTemplate } from "../../CodeTemplates/ReactComponentTemplate";
import { useReactComponent } from "../../contexts/ReactComponentContext";
import { downloadFile, getValidComponentName } from "../../helper/helper";
import styles from "./ClassGenerator.module.scss";
import Tab from "../../components/Tab/Tab";

import { ReactComponent as ReactLogo } from "../../assets/svg/react_logo.svg";
import { ReactComponent as UnitTestLogo } from "../../assets/svg/unit-test.svg";
import { ReactComponent as SassLogo } from "../../assets/svg/sass_logo.svg";
import { ReactComponent as CssLogo } from "../../assets/svg/css_logo.svg";
import { ReactComponent as DownloadIcon } from "../../assets/svg/g_download.svg";
import Tooltip from "../../components/Tooltip/Tooltip";

export default function ClassGenerator() {
  const { name, props, states, effects, refs, isStyleModule, cssMode } =
    useReactComponent();
  const [activeTab, setActiveTab] = useState<"component" | "style" | "test">(
    "component"
  );
  const validatedName = getValidComponentName(name);

  const handleDownload = () => {
    switch (activeTab) {
      case "component":
        downloadFile(
          `${validatedName}.tsx`,
          ReactComponentTemplate({
            validatedName,
            props,
            states,
            effects,
            refs,
          })
        );
        break;
      case "style":
        downloadFile(
          `${validatedName}${isStyleModule ? ".module" : ""}.${cssMode}`,
          ""
        );
        break;
      case "test":
        downloadFile(
          `${validatedName}.test.tsx`,
          ReactComponentTestTemplate({
            validatedName,
            props,
            states,
            effects,
            refs,
          })
        );
        break;
    }
  };

  const downloadAllFiles = () => {
    debugger;
    downloadFile(
      `${validatedName}.tsx`,
      ReactComponentTemplate({ validatedName, props, states, effects, refs })
    );
    downloadFile(
      `${validatedName}${isStyleModule ? ".module" : ""}.${cssMode}`,
      ""
    );
    downloadFile(
      `${validatedName}.test.tsx`,
      ReactComponentTestTemplate({
        validatedName,
        props,
        states,
        effects,
        refs,
      })
    );
  };
  return (
    <div className={styles.container}>
      <div className={styles.tabContainer}>
        <Tab
          onClick={() => setActiveTab("component")}
          title={validatedName + ".tsx"}
          isActive={activeTab === "component"}
          logo={<ReactLogo />}
        />

        <Tab
          onClick={() => setActiveTab("style")}
          title={`${validatedName}.${isStyleModule ? "module." : ""}${cssMode}`}
          isActive={activeTab === "style"}
          logo={cssMode === "scss" ? <SassLogo /> : <CssLogo />}
        />

        <Tab
          onClick={() => setActiveTab("test")}
          title={`${validatedName}.test.tsx`}
          isActive={activeTab === "test"}
          logo={<UnitTestLogo />}
        />
      </div>
      <div>
        {activeTab === "component" && (
          <blockquote>
            <pre>
              <code>
                {ReactComponentTemplate({
                  name: validatedName,
                  props,
                  states,
                  effects,
                  refs,
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
                  name: validatedName,
                  props,
                })}
              </code>
            </pre>
          </blockquote>
        )}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
          cursor: "pointer",
        }}
        onClick={handleDownload}
      >
        <Tooltip
          content={"Download this file"}
          direction={"top"}
          delay={100}
          gap={15}
        >
          <div className={styles.downloadButton}>
            <DownloadIcon /> (1)
          </div>
        </Tooltip>
      </div>

      <div
        style={{ position: "absolute", bottom: 16, right: 80 }}
        onClick={downloadAllFiles}
      >
        <Tooltip content={"Download all files"} direction={"left"} delay={100}>
          <div className={styles.downloadButton}>
            <DownloadIcon />
          </div>
        </Tooltip>
      </div>
    </div>
  );
}
