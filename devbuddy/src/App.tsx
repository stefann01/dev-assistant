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
import ContextGenerator from "./React/context-generator/ContextGenerator";
import ReactContextContextProvider from "./contexts/ReactContextContext";

function App() {
  const [user, loading] = useAuthState(auth);
  return (
    <>
      {!loading && (
        <Router>
          <PropertiesProvider>
            <ReactComponentContextProvider>
              <ReactContextContextProvider>
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
                      <Route path="" element={<h1>COMING SOON...</h1>} />
                    </Route>
                    <Route path="/react-component" element={<PrivateRoute />}>
                      <Route path="" element={<ReactComponentGenerator />} />
                    </Route>
                    <Route path="/react-context" element={<PrivateRoute />}>
                      <Route path="" element={<ContextGenerator />} />
                    </Route>
                    <Route
                      path="/animation-generator"
                      element={<PrivateRoute />}
                    >
                      <Route path="" element={<h1>COMING SOON...</h1>} />
                    </Route>
                    <Route
                      path="/gradient-generator"
                      element={<PrivateRoute />}
                    >
                      <Route path="" element={<h1>COMING SOON...</h1>} />
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
                    <Route path="/*" element={<h1>COMING SOON...</h1>} />
                  </Routes>
                </div>
              </ReactContextContextProvider>
            </ReactComponentContextProvider>
          </PropertiesProvider>
        </Router>
      )}
      {loading && <LoadingIndicator />}
    </>
  );
}

export default App;
