import React, { useReducer } from "react";
import Action from "../Models/Action.model";
import {
  ReactContextActions,
  ReactContextReducer,
} from "../reducers/ReactContextReducer";

type ContextProp = {
  name: string;
  type: "string" | "number" | "boolean" | "object" | "array";
  defaultValue: any;
};

type ReactContextContextType = {
  name: string;
  actions: string[];
  props: ContextProp[];
  stateName: string;
  dispatch: React.Dispatch<Action<ReactContextActions, any>>;
};

const ReactContextContext = React.createContext({} as ReactContextContextType);

export default function ReactContextContextProvider(props: any) {
  const [state, dispatch] = useReducer(ReactContextReducer, {
    name: "MyComponent",
    actions: [],
    props: [],
    stateName: "MyContextState",
  });

  return (
    <ReactContextContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </ReactContextContext.Provider>
  );
}

export function useReactContext() {
  return React.useContext(ReactContextContext);
}
