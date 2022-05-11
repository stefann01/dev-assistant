import React, { useState } from "react";
import {
  logInWithEmailAndPassword,
  signUpUserWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase";
import AuthenticationComponent from "../components/Authentication";

interface AuthenticationProps {
  type: "login" | "register";
}
export default function Authentication({ type }: AuthenticationProps) {
  const [user, setUser] = useState({ email: "", password: "" });

  const onUserChanged = (key: string, value: string) => {
    setUser({ ...user, [key]: value });
  };
  const onSubmit = () => {
    if (type === "login") {
      logInWithEmailAndPassword(user.email, user.password);
    } else {
      signUpUserWithEmailAndPassword(user.email, user.password);
    }
  };

  return (
    <AuthenticationComponent
      user={user}
      userChanged={(key: string, value: string) => onUserChanged(key, value)}
      onSubmit={onSubmit}
      onGoogleSubmit={signInWithGoogle}
      type={type}
    />
  );
}
