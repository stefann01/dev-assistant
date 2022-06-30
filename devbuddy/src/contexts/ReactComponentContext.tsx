import React, { useReducer } from "react";
import Action from "../Models/Action.model";
import {
  ReactProp,
  ReactState,
  ReactEffect,
  ReactRef,
} from "../Models/ReactTypes";
import {
  ReactComponentActions,
  ReactComponentReducer,
} from "../reducers/ReactComponentReducer";

type ReactComponentContextType = {
  name: string;
  cssMode: "css" | "scss";
  isStyleModule: boolean;
  props: ReactProp[];
  states: ReactState[];
  effects: ReactEffect[];
  refs: ReactRef[];
  arePropsVisible: boolean;
  areStatesVisible: boolean;
  areEffectsVisible: boolean;
  areRefsVisible: boolean;
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
    refs: [],
    arePropsVisible: true,
    areStatesVisible: true,
    areEffectsVisible: true,
    areRefsVisible: true,
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
