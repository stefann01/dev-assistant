import React, { useState } from "react";
import Input from "../../components/Input/Input";
import { logInWithEmailAndPassword, logout } from "../../firebase";

export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  return (
    <div
      style={{
        height: 300,
        display: "flex",
        flexDirection: "column",
        margin: 10,
      }}
    >
      <Input
        type="text"
        value={user.email}
        onChange={(e) =>
          setUser((prevUser) => ({ ...prevUser, email: e.target.value }))
        }
      />
      <Input
        type="password"
        value={user.password}
        onChange={(e) =>
          setUser((prevUser) => ({ ...prevUser, password: e.target.value }))
        }
      />

      <button
        onClick={() => logInWithEmailAndPassword(user.email, user.password)}
      >
        Login
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
