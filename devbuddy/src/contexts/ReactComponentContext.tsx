import React, { useReducer } from "react";
import Action from "../Models/Action.model";
import {
  ReactComponentActions,
  ReactComponentReducer,
} from "../reducers/ReactComponentReducer";

type ReactProp = {
  name: string;
  type: string;
};

type ReactState = {
  name: string;
  defaultValue: any;
};

type ReactEffect = {
  hasCleanUpFunction: boolean;
  hasDependencyArray: boolean;
  depArray: string[];
};
type ReactComponentContextType = {
  name: string;
  cssMode: "css" | "scss";
  isStyleModule: boolean;
  props: ReactProp[];
  states: ReactState[];
  effects: ReactEffect[];
  arePropsVisible: boolean;
  areStatesVisible: boolean;
  areEffectsVisible: boolean;
  dispatch: React.Dispatch<Action<ReactComponentActions, any>>;
};

const ReactComponentContext = React.createContext(
  {} as ReactComponentContextType
);

export default function ReactComponentContextProvider(props: any) {
  const [state, dispatch] = useReducer(ReactComponentReducer, {
    name: "MyComponent",
    cssMode: "css",
    isStyleModule: false,
    props: [],
    states: [],
    effects: [],
    arePropsVisible: true,
    areStatesVisible: true,
    areEffectsVisible: true,
  });

  return (
    <ReactComponentContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </ReactComponentContext.Provider>
  );
}

export function useReactComponent() {
  return React.useContext(ReactComponentContext);
}
