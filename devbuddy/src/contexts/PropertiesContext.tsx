import React, { useReducer } from "react";
import Action from "../Models/Action.model";
import Property from "../Models/Properties.model";
import {
  PropertiesReducer,
  PropertiesReducerActions,
} from "../reducers/PropertiesReducer";

type PropertiesContextType = {
  properties: Property[];
  entityType: "class" | "interface" | "builder";
  entityName: string;
  dispatch: React.Dispatch<Action<PropertiesReducerActions, any>>;
};

const PropertyContext = React.createContext({} as PropertiesContextType);

export default function PropertiesProvider(props: any) {
  const [state, dispatch] = useReducer(PropertiesReducer, {
    properties: [],
    entityType: "class",
  });

  return (
    <PropertyContext.Provider
      value={{
        properties: state.properties,
        entityType: state.entityType,
        entityName: state.entityName,
        dispatch,
      }}
    >
      {props.children}
    </PropertyContext.Provider>
  );
}

export function useProperties() {
  return React.useContext(PropertyContext);
}
