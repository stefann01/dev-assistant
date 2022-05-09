import React from "react";
import styles from "./Authentication.module.scss";
import { ReactComponent as Cat } from "../../assets/svg/Cat.svg";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { ReactComponent as Google } from "../../assets/svg/google.svg";

export default function Authentication() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h1 className={styles.title}>Your personal dev buddy</h1>
        <div className={styles.subtitle}>
          <div className={styles.line}></div>
          <p>I cast spells,</p>
          <p>create code </p>
          <p>and make </p>
          <p>MAGIC </p>
          <div className={styles.line}></div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.form}>
          <div className={styles.formHeader}>
            <Cat width={113} height={116} />
            <h1> The Dev Buddy</h1>
          </div>
          <div className={styles.formControl}>
            <label>Email</label>
            <Input type="text" value={""} style={{ marginTop: "5px" }} />
          </div>

          <div className={styles.formControl}>
            <label>Password</label>
            <Input type="password" value={""} style={{ marginTop: "5px" }} />
          </div>

          <Button style={{ width: "100%", height: "56px", marginTop: "32px" }}>
            <span className={styles.buttonText}>Register</span>
          </Button>

          <div className={styles.orComponent}>
            <div className={styles.formLine}></div>
            <span>or</span>
            <div className={styles.formLine}></div>
          </div>

          <Button
            style={{
              width: "100%",
              height: "56px",
              marginTop: "32px",
              background: "white",
              color: "#000",
            }}
          >
            <Google />
            <span className={styles.buttonText}>Sign up with google</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
