import React from "react";
import styles from "./App.module.scss";
import SideBar from "./side-bar/SideBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClassGenerator from "./ClassGenerator/ClassGenerator";
import PropertiesProvider from "./contexts/PropertiesContext";

function App() {
  return (
    <Router>
      <div className={styles.appContainer}>
        <SideBar />
        <Routes>
          <Route path="/" element={<p>Home</p>} />
          <Route
            path="/class-generator"
            element={
              <PropertiesProvider>
                <ClassGenerator />
              </PropertiesProvider>
            }
          />
          <Route path="/color-convertor" element={<p>Color convertor</p>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
