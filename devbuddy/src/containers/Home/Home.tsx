import React from "react";
import Card from "../../components/Card/Card";
import { ReactComponent as ReactLogo } from "../../assets/svg/ReactLogo.svg";
import { ReactComponent as AngularLogo } from "../../assets/svg/AngularLogo.svg";
import styles from "./Home.module.scss";

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.blur}></div>
      <div className={styles.homeContent}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>
            Welcome! <br /> I'm your development assistant.
          </h1>
          <h2 className={styles.subtitle}>
            Feel tired of repetitive work? I'm here to help you! <br /> I cast
            some spells, write code and make magic
          </h2>
        </div>
        <div className={styles.cardsContainer}>
          {/* TODO: Check scrolling issue when multiple cards added */}
          <Card
            title="React Component"
            text="Generate a React component in a blink of an eye, without thinking about the syntax."
            buttonText="GO React"
            logo={<ReactLogo />}
          />

          <Card
            title="Angular Component"
            text="Generate an Angular component in a blink of an eye, without thinking about the syntax."
            buttonText="GO Angular"
            logo={<AngularLogo />}
          />
        </div>
      </div>
    </div>
  );
}
