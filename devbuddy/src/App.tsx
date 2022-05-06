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
import Login from "./Login/login";
import ReactComponentGenerator from "./React/component-generator/ReactComponentGenerator";
import ReactComponentContextProvider from "./contexts/ReactComponentContext";
import PrivateRoute from "./auth/login/PrivateRoute";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import LoadingIndicator from "./components/LoadingIndicator/LoadingIndicator";

function App() {
  const [user, loading] = useAuthState(auth);
  return (
    <>
      {!loading && (
        <Router>
          <PropertiesProvider>
            <ReactComponentContextProvider>
              <div className={styles.appContainer}>
                {user && <SideBar />}
                <Routes>
                  <Route path="/" element={<PrivateRoute />}>
                    <Route path="" element={<p>Home</p>} />
                  </Route>
                  <Route path="/class-generator" element={<PrivateRoute />}>
                    <Route path="" element={<ClassGenerator />} />
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
                    element={user ? <Navigate to="/" /> : <Login />}
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
