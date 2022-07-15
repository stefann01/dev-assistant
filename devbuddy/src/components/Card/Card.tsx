import React from "react";
import Button from "../Button/Button";
import styles from "./Card.module.scss";

interface CardProps {
  title: string;
  text: string;
  buttonText: string;
  logo: React.ReactNode;
  onClick?: () => void;
}

export default function Card({
  title,
  text,
  buttonText,
  logo,
  onClick,
}: CardProps) {
  return (
    <div className={styles.cardContainer}>
      <div style={{ width: "125px" }}>{logo}</div>
      <div style={{ marginLeft: "20px", marginRight: "20px" }}>
        <p className={styles.title}>{title}</p>
        <p className={styles.text}>{text}</p>
      </div>
      <Button
        style={{
          marginLeft: "auto",
          height: "40px",
          width: "160px",
          alignSelf: "end",
        }}
        onClick={onClick}
      >
        {buttonText}
      </Button>
    </div>
  );
}
