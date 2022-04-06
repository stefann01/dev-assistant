import React, { useState } from "react";

import styles from "./login.module.scss";

export default function Login() {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <label htmlFor="">Email</label>
        <input
          type="text"
          onChange={(e) => {
            setUserCredentials({ ...userCredentials, email: e.target.value });
          }}
        />
        <label htmlFor="">Password</label>
        <input
          type="text"
          onChange={(e) => {
            setUserCredentials({
              ...userCredentials,
              password: e.target.value,
            });
          }}
        />
        <input
          type="submit"
          onClick={() => {
            console.log(userCredentials);
          }}
        />
      </div>
    </div>
  );
}
