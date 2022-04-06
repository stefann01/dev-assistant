import React from "react";
import styles from "./App.module.scss";
import SideBar from "./side-bar/SideBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClassGenerator from "./ClassGenerator/ClassGenerator";
import PropertiesProvider from "./contexts/PropertiesContext";
import Login from "./Login/login";
import ReactComponentGenerator from "./React/component-generator/ReactComponentGenerator";
import ReactComponentContextProvider from "./contexts/ReactComponentContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

function App() {
  function Sidebar() {
    if (window.location.pathname == "/login") {
      return <></>;
    }
    if (window.location.pathname != "/login") {
      return <SideBar />;
    }
  }

  return (
    <Router>
      <PropertiesProvider>
        <ReactComponentContextProvider>
          <div className={styles.appContainer}>
            {Sidebar()}
            <Routes>
              <Route path="/" element={<p>Home</p>}></Route>
              <Route path="/class-generator" element={<ClassGenerator />} />
              <Route path="/color-convertor" element={<p>Color convertor</p>} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/react-component"
                element={<ReactComponentGenerator />}
              />
            </Routes>
          </div>
        </ReactComponentContextProvider>
      </PropertiesProvider>
    </Router>
  );
}

export default App;
