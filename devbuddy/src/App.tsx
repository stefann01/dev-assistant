import React from "react";
import styles from "./App.module.scss";
import SideBar from "./side-bar/SideBar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ClassGenerator from "./ClassGenerator/ClassGenerator";
import PropertiesProvider from "./contexts/PropertiesContext";
import ReactComponentGenerator from "./React/component-generator/ReactComponentGenerator";
import ReactComponentContextProvider from "./contexts/ReactComponentContext";
import PrivateRoute from "./auth/PrivateRoute";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import LoadingIndicator from "./components/LoadingIndicator/LoadingIndicator";
import Authentication from "./auth/containers/Authentication";
import RadiusGenerator from "./containers/RadiusGenerator/RadiusGenerator";
import Home from "./containers/Home/Home";

function App() {
  const [user, loading] = useAuthState(auth);
  return (
    <>
      {!loading && (
        <Router>
          <PropertiesProvider>
            <ReactComponentContextProvider>
              <div className={styles.appContainer}>
                {true && <SideBar />}
                <Routes>
                  <Route path="/" element={<PrivateRoute />}>
                    <Route path="" element={<Home />} />
                  </Route>
                  <Route path="/class-generator" element={<PrivateRoute />}>
                    <Route path="" element={<ClassGenerator />} />
                  </Route>
                  <Route path="/radius-generator" element={<PrivateRoute />}>
                    <Route path="" element={<RadiusGenerator />} />
                  </Route>
                  <Route path="/color-convertor" element={<PrivateRoute />}>
                    <Route
                      path=""
                      element={
                        <a
                          href="https://stefann01.github.io/css-unit-converter/"
                          target={"_blank"}
                          rel="noreferrer"
                        >
                          Color convertor
                        </a>
                      }
                    />
                  </Route>
                  <Route path="/react-component" element={<PrivateRoute />}>
                    <Route path="" element={<ReactComponentGenerator />} />
                  </Route>
                  <Route path="/animation-generator" element={<PrivateRoute />}>
                    <Route
                      path=""
                      element={
                        <a
                          href="https://angrytools.com/css/animation"
                          target={"_blank"}
                          rel="noreferrer"
                        >
                          https://angrytools.com/css/animation/
                        </a>
                      }
                    />
                  </Route>
                  <Route
                    path="/login"
                    element={
                      user ? (
                        <Navigate to="/" />
                      ) : (
                        <Authentication type="login" />
                      )
                    }
                  />
                  <Route
                    path="/register"
                    element={
                      user ? (
                        <Navigate to="/" />
                      ) : (
                        <Authentication type="register" />
                      )
                    }
                  />
                  {/* <Route path="/not-found" element={<p>Not found</p>} /> */}
                </Routes>
              </div>
            </ReactComponentContextProvider>
          </PropertiesProvider>
        </Router>
      )}
      {loading && <LoadingIndicator />}
    </>
  );
}

export default App;
