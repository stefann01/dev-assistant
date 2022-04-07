import React from "react";
import NavItem from "../components/NavItem/NavItem";
import NavSectionTitle from "../components/NavSectionTitle/NavSectionTitle";
import styles from "./SideBar.module.scss";
import Cat from "../assets/svg/Cat.svg";
import { useNavigate } from "react-router-dom";
import { logout } from "../firebase";

export default function SideBar() {
  const navigate = useNavigate();
  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.logoContainer} onClick={() => navigate("/")}>
        <img
          src={Cat}
          alt="Dev buddy main logo."
          className={styles.logoImage}
        />
        <p className={styles.logoTitle}>The Dev Buddy</p>
      </div>

      <NavSectionTitle title="Code" />
      <div className={styles.codeItemsContainer}>
        <NavItem
          title="Props to class"
          onClick={() => navigate("/class-generator")}
        />
        <NavItem
          title="Color convertor"
          onClick={() => navigate("/color-convertor")}
        />
        <NavItem title="Rems & pixels" />
        <NavItem title="JSON converter" />
        <NavItem title="Date formatter" />
      </div>

      <NavSectionTitle title="UI" />

      <div className={styles.codeItemsContainer}>
        <NavItem title="Gradient generator" />
        <NavItem title="Radius generator" />
        <NavItem title="Shadow generator" />
      </div>

      <NavSectionTitle title="REACT" />
      <div className={styles.codeItemsContainer}>
        <NavItem
          title="React component"
          onClick={() => navigate("/react-component")}
        />
      </div>
      <button onClick={logout}>Log out</button>
    </div>
  );
}
