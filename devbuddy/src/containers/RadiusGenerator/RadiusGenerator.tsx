import React, { useState } from "react";
import Input from "../../components/Input/Input";
import Switch from "../../components/Switch/Switch";
import RadiusModel from "../../Models/RadiusModel";
import styles from "./RadiusGenerator.module.scss";
import { ReactComponent as CopyIcon } from "../../assets/svg/Copy.svg";
import Button from "../../components/Button/Button";
import Tooltip from "../../components/Tooltip/Tooltip";
import { copyTextToClipboard } from "../../helper/helper";

export default function RadiusGenerator() {
  const [radius, setRadius] = useState<RadiusModel>(
    new RadiusModel(12, 12, 12, 12, 12, 12, 12, 12)
  );
  const [customSize, setCustomSize] = useState({
    width: 500,
    height: 500,
    isActive: false,
  });
  const inputStyle: React.CSSProperties = {
    width: "48px",
    height: "32px",
    marginRight: "10px",
  };

  const [copyStatusMessage, setCopyStatusMessage] = useState({
    visible: false,
    message: "",
  });

  const onChangeRadius = (
    value: number,
    location:
      | "topLeft"
      | "topRight"
      | "bottomLeft"
      | "bottomRight"
      | "leftTop"
      | "rightTop"
      | "leftBottom"
      | "rightBottom"
  ) => {
    setRadius((prevState) => {
      const newRadius = { ...prevState };
      newRadius[location] = value;
      return newRadius;
    });
  };

  return (
    <div className={styles.container}>
      <h1>Radius generator</h1>

      <div
        className={styles.elementContainer}
        style={{
          width: customSize.isActive ? `${customSize.width}px` : "50vmin",
          height: customSize.isActive ? `${customSize.height}px` : "50vmin",
        }}
      >
        {/* Top */}
        <input
          className={`${styles.slider} ${styles.sliderTop}`}
          type="range"
          value={radius.topLeft}
          onChange={(e) => onChangeRadius(Number(e.target.value), "topLeft")}
        />

        <input
          className={`${styles.slider} ${styles.sliderTop}`}
          type="range"
          value={radius.topRight}
          style={{ transform: "rotate(-180deg)" }}
          onChange={(e) => onChangeRadius(Number(e.target.value), "topRight")}
        />

        {/* Bottom */}
        <input
          className={`${styles.slider} ${styles.sliderBottom}`}
          type="range"
          value={radius.bottomLeft}
          onChange={(e) => onChangeRadius(Number(e.target.value), "bottomLeft")}
        />

        <input
          className={`${styles.slider} ${styles.sliderBottom}`}
          type="range"
          style={{ transform: "rotate(-180deg)" }}
          value={radius.bottomRight}
          onChange={(e) =>
            onChangeRadius(Number(e.target.value), "bottomRight")
          }
        />

        {/* Left */}
        <input
          className={`${styles.slider} ${styles.sliderVerticalLeft}`}
          aria-orientation="vertical"
          type="range"
          value={radius.leftTop}
          onChange={(e) => onChangeRadius(Number(e.target.value), "leftTop")}
          style={{
            width: customSize.isActive ? `${customSize.height + 15}px` : "",
            left: customSize.isActive ? `${-customSize.height / 2 - 10}px` : "",
          }}
        />

        <input
          style={{
            width: customSize.isActive
              ? `${customSize.height + 15}px`
              : "calc(100% + 15px)",
            left: customSize.isActive
              ? `${-customSize.height / 2 - 10}px`
              : "calc(-50% - 10px)",
            transform: "rotate(-90deg)",
          }}
          className={`${styles.slider} ${styles.sliderVerticalLeft}`}
          aria-orientation="vertical"
          type="range"
          value={radius.leftBottom}
          onChange={(e) => onChangeRadius(Number(e.target.value), "leftBottom")}
        />

        {/* Right */}
        <input
          style={{
            width: customSize.isActive
              ? `${customSize.height + 15}px`
              : "calc(100% + 15px)",
            right: customSize.isActive
              ? `${-customSize.height / 2 - 10}px`
              : "calc(-50% - 10px)",
          }}
          className={`${styles.slider} ${styles.sliderVerticalRight}`}
          aria-orientation="vertical"
          type="range"
          value={radius.rightTop}
          onChange={(e) => onChangeRadius(Number(e.target.value), "rightTop")}
        />

        <input
          style={{
            width: customSize.isActive
              ? `${customSize.height + 15}px`
              : "calc(100% + 15px)",
            right: customSize.isActive
              ? `${-customSize.height / 2 - 10}px`
              : "calc(-50% - 10px)",
            transform: "rotate(-90deg)",
          }}
          className={`${styles.slider} ${styles.sliderVerticalRight}`}
          aria-orientation="vertical"
          type="range"
          value={radius.rightBottom}
          onChange={(e) =>
            onChangeRadius(Number(e.target.value), "rightBottom")
          }
        />

        <div
          className={styles.radiusElement}
          style={{
            width: customSize.isActive ? `${customSize.width}px` : "100%",
            height: customSize.isActive ? `${customSize.height}px` : "100%",
            borderRadius: `${radius.topLeft}% ${radius.topRight}% ${radius.bottomRight}% ${radius.bottomLeft}% / ${radius.leftTop}% ${radius.rightTop}% ${radius.rightBottom}% ${radius.leftBottom}%`,
          }}
        ></div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          marginBottom: "56px",
        }}
      >
        <div className={styles.controlsContainer}>
          <div className={styles.controlsSection}>
            <Input
              type="number"
              value={radius.topLeft.toString()}
              style={inputStyle}
              min={0}
              max={100}
              onChange={(e) => onChangeRadius(+e.target.value, "topLeft")}
            />
            <Input
              type="number"
              min={0}
              max={100}
              value={radius.topRight.toString()}
              style={inputStyle}
              onChange={(e) => onChangeRadius(+e.target.value, "topRight")}
            />
            <Input
              type="number"
              min={0}
              max={100}
              value={radius.bottomRight.toString()}
              style={inputStyle}
              onChange={(e) => onChangeRadius(+e.target.value, "bottomRight")}
            />
            <Input
              type="number"
              min={0}
              max={100}
              value={radius.bottomLeft.toString()}
              style={inputStyle}
              onChange={(e) => onChangeRadius(+e.target.value, "bottomLeft")}
            />
          </div>
          /
          <div className={styles.controlsSection}>
            <Input
              type="number"
              min={0}
              max={100}
              value={radius.leftTop.toString()}
              style={inputStyle}
              onChange={(e) => onChangeRadius(+e.target.value, "leftTop")}
            />
            <Input
              type="number"
              min={0}
              max={100}
              value={radius.rightTop.toString()}
              style={inputStyle}
              onChange={(e) => onChangeRadius(+e.target.value, "rightTop")}
            />
            <Input
              type="number"
              min={0}
              max={100}
              value={radius.rightBottom.toString()}
              style={inputStyle}
              onChange={(e) => onChangeRadius(+e.target.value, "rightBottom")}
            />
            <Input
              type="number"
              min={0}
              max={100}
              value={radius.leftBottom.toString()}
              style={inputStyle}
              onChange={(e) => onChangeRadius(+e.target.value, "leftBottom")}
            />
          </div>
          <Tooltip content="Copy radius to clipboard.">
            <Button
              onClick={() =>
                copyTextToClipboard(
                  `border-radius: ${radius.topLeft}% ${radius.topRight}% ${radius.bottomRight}% ${radius.bottomLeft}% / ${radius.leftTop}% ${radius.rightTop}% ${radius.rightBottom}% ${radius.leftBottom}%;`,
                  () => {
                    setCopyStatusMessage({
                      ...copyStatusMessage,
                      visible: true,
                      message: "Copied to clipboard! 🚀",
                    });
                    setTimeout(() => {
                      setCopyStatusMessage({
                        ...copyStatusMessage,
                        message: "",
                        visible: false,
                      });
                    }, 1500);
                  },
                  () => {
                    setCopyStatusMessage({
                      ...copyStatusMessage,
                      visible: true,
                      message: "Failed to copy to clipboard 😢",
                    });
                    setTimeout(() => {
                      setCopyStatusMessage({
                        ...copyStatusMessage,
                        message: "",
                        visible: false,
                      });
                    }, 1500);
                  }
                )
              }
            >
              <CopyIcon width={24} height={24} fill="white" />
            </Button>
          </Tooltip>
        </div>
        {copyStatusMessage.visible && <p>{copyStatusMessage.message}</p>}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: customSize.isActive ? "space-between" : "flex-start",
          alignItems: "center",
          width: "50vw",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <p style={{ marginRight: "10px" }}>Choose your size:</p>

          <Switch
            style={{ width: "40px", height: "16px" }}
            isActive={customSize.isActive}
            onChange={() => {
              setCustomSize({
                ...customSize,
                isActive: !customSize.isActive,
              });
            }}
          />
        </div>

        {customSize.isActive && (
          <span
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <p style={{ marginRight: "10px" }}>Width:</p>
            <Input
              type="number"
              onChange={(e) => {
                setCustomSize({ ...customSize, width: +e.target.value });
              }}
              value={customSize.width.toString()}
            />
          </span>
        )}
        {customSize.isActive && (
          <span
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <p style={{ marginRight: "10px" }}>Height:</p>
            <Input
              type="number"
              onChange={(e) => {
                setCustomSize({ ...customSize, height: +e.target.value });
              }}
              value={customSize.height.toString()}
            />
          </span>
        )}
      </div>
    </div>
  );
}
