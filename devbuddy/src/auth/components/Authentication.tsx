import React from "react";
import styles from "./Authentication.module.scss";
import { ReactComponent as Cat } from "../../assets/svg/Cat.svg";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { ReactComponent as Google } from "../../assets/svg/google.svg";
import { useNavigate } from "react-router-dom";
import Divider from "../../components/Divider/Divider";

interface AuthenticationProps {
  user: any;
  userChanged: any;
  onSubmit: any;
  onGoogleSubmit: any;
  type: "login" | "register";
}
export default function Authentication({
  user,
  userChanged,
  onSubmit,
  onGoogleSubmit,
  type,
}: AuthenticationProps) {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.formHeader}>
          <Cat width={113} height={116} />
          <h1> The Dev Buddy</h1>
        </div>
        <div className={styles.formControl}>
          <label>Email</label>
          <Input
            type="text"
            value={user.email}
            onChange={(e) => userChanged("email", e.target.value)}
            style={{ marginTop: "5px" }}
          />
        </div>

        <div className={styles.formControl}>
          <label>Password</label>
          <Input
            type="password"
            value={user.password}
            onChange={(e) => userChanged("password", e.target.value)}
            style={{ marginTop: "5px" }}
          />
        </div>

        <Button
          style={{ width: "100%", height: "56px", marginTop: "32px" }}
          onClick={onSubmit}
        >
          <span className={styles.buttonText}>
            {type === "login" ? "Login" : "Register"}
          </span>
        </Button>
        {type === "register" && (
          <p>
            Already have an account?{" "}
            <span
              className={styles.switchViewText}
              onClick={() => navigate("/login")}
            >
              Login
            </span>{" "}
          </p>
        )}

        {type === "login" && (
          <p>
            Don't have an account?{" "}
            <span
              className={styles.switchViewText}
              onClick={() => navigate("/register")}
            >
              Register
            </span>{" "}
          </p>
        )}

        <Divider
          text="or"
          style={{
            height: "20px",
            text: { spacing: "10px", fontSize: "30px" },
          }}
        />

        <Button
          style={{
            width: "100%",
            height: "56px",
            marginTop: "32px",
            background: "white",
            color: "#000",
          }}
          onClick={onGoogleSubmit}
        >
          <Google />
          <span className={styles.buttonText}>Sign in with google</span>
        </Button>
      </div>
    </div>
  );
}
