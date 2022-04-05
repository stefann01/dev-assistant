import React from "react";
import styles from "./App.module.scss";
import SideBar from "./side-bar/SideBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClassGenerator from "./ClassGenerator/ClassGenerator";
import PropertiesProvider from "./contexts/PropertiesContext";
import Login from "./Login/login";

function App() {
  function LoginPageCheck() {
    if (window.location.pathname == "/login") {
      return <div></div>;
    } else {
      return <SideBar />;
    }
  }

  return (
    <Router>
      <PropertiesProvider>
        <div className={styles.appContainer}>
          {LoginPageCheck()}
          <Routes>
            <Route path="/" element={<p>Home</p>}></Route>
            <Route path="/class-generator" element={<ClassGenerator />} />
            <Route path="/color-convertor" element={<p>Color convertor</p>} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </PropertiesProvider>
    </Router>
  );
}

export default App;
