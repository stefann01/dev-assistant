import React, { useState } from "react";
import Input from "../../components/Input/Input";
import RadiusModel from "../../Models/RadiusModel";
import styles from "./RadiusGenerator.module.scss";

export default function RadiusGenerator() {
  const [radius, setRadius] = useState<RadiusModel>(
    new RadiusModel(12, 12, 12, 12, 12, 12, 12, 12)
  );
  const inputStyle: React.CSSProperties = {
    width: "48px",
    height: "32px",
    marginRight: "10px",
  };

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
      </div>

      <div className={styles.elementContainer}>
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
        />

        <input
          className={`${styles.slider} ${styles.sliderVerticalLeft}`}
          aria-orientation="vertical"
          type="range"
          style={{ transform: "rotate(-90deg)" }}
          value={radius.leftBottom}
          onChange={(e) => onChangeRadius(Number(e.target.value), "leftBottom")}
        />

        {/* Right */}
        <input
          className={`${styles.slider} ${styles.sliderVerticalRight}`}
          aria-orientation="vertical"
          type="range"
          value={radius.rightTop}
          onChange={(e) => onChangeRadius(Number(e.target.value), "rightTop")}
        />

        <input
          className={`${styles.slider} ${styles.sliderVerticalRight}`}
          aria-orientation="vertical"
          type="range"
          style={{ transform: "rotate(-90deg)" }}
          value={radius.rightBottom}
          onChange={(e) =>
            onChangeRadius(Number(e.target.value), "rightBottom")
          }
        />

        <div
          className={styles.radiusElement}
          style={{
            borderRadius: `${radius.topLeft}% ${radius.topRight}% ${radius.bottomRight}% ${radius.bottomLeft}% / ${radius.leftTop}% ${radius.rightTop}% ${radius.rightBottom}% ${radius.leftBottom}%`,
          }}
        ></div>
      </div>
    </div>
  );
}
