import React, { useState } from "react";

import styles from "./login.module.scss";

export default function Login() {
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");

  function emailUpdate(e: String) {
    setEmail(e);
  }

  function passwordUpdate(e: String) {
    setPassword(e);
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <label htmlFor="">Email</label>
        <input
          type="text"
          onChange={(e) => {
            emailUpdate(e.target.value);
          }}
        />
        <label htmlFor="">Password</label>
        <input
          type="text"
          onChange={(e) => {
            passwordUpdate(e.target.value);
          }}
        />
        <input
          type="submit"
          onClick={() => {
            console.log(email);
            console.log(password);
          }}
        />
      </div>
    </div>
  );
}
