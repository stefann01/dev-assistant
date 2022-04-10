import React, { useState } from "react";
import { logInWithEmailAndPassword } from "../firebase";
import { useNavigate } from "react-router-dom";

import styles from "./login.module.scss";
import Input from "../components/Input/Input";

export default function Login() {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await logInWithEmailAndPassword(
        userCredentials.email,
        userCredentials.password
      );
      if (response.user) {
        setError("");
        return navigate("/");
      }
    } catch (e) {
      setError("Wrong username or password");
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.container} onSubmit={(e) => login(e)}>
        <label htmlFor="">Email</label>
        <Input
          value={userCredentials.email}
          type="text"
          onChange={(e) => {
            setUserCredentials({ ...userCredentials, email: e.target.value });
          }}
        />
        <label htmlFor="">Password</label>
        <Input
          type="password"
          value={userCredentials.password}
          onChange={(e) => {
            setUserCredentials({
              ...userCredentials,
              password: e.target.value,
            });
          }}
        />
        <input type="submit" />
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
