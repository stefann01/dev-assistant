import prettier from "prettier/standalone";
import babel from "prettier/parser-babel";
import typescript from "prettier/parser-typescript";
import { ReactContextState } from "../reducers/ReactContextReducer";
import { getValidVariableName, getValidTypeName } from "../helper/helper";

export const ReactContextTemplate = ({
  name,
  actions,
  props,
}: ReactContextState) => {
  return prettier.format(
    `
  import React, { useReducer } from "react";
  
  interface ${name}ContextType {
    ${props
      .map(
        (prop: any) =>
          `${getValidVariableName(prop.name)}: ${getValidTypeName(prop.type)};`
      )
      .join("\n")}
  }

  const ${name}Context = React.createContext({} as ${name}ContextType);

    export default function ${name}ContextProvider(props: any) {
        const [state, dispatch] = useReducer(${name}Reducer, {
            ${props
              .map(
                (prop: any) =>
                  `${getValidVariableName(prop.name)}: ${prop.defaultValue},`
              )
              .join("\n")}
        });

        return (
            <${name}Context.Provider value={{ ...state, dispatch }}>
                {props.children}
            </${name}Context.Provider>
        );
    }

    export function use${name}Context() {
        return React.useContext(${name}Context);
    }
    
  `,
    {
      parser: "typescript",
      plugins: [typescript, babel],
    }
  );
};

export const ReactContextActionsTemplate = ({
  name,
  actions,
}: {
  name: string;
  actions: string[];
}) => {
  return prettier.format(
    `
  export enum ${name}Actions {
    ${actions
      .map((action: string) => `${getValidVariableName(action)}`)
      .join(",\n")}
  }
  
  `,
    {
      parser: "typescript",
      plugins: [typescript, babel],
    }
  );
};

export const ReactContextReducerTemplate = ({
  name,
  actions,
}: {
  name: string;
  actions: string[];
}): string => {
  debugger;
  return prettier.format(
    `
  import { ${name}Actions } from "./${name}Actions";

  class Action<T, P> {
    constructor(public type: T, public payload?: P) {}
  }
  
  export function ${name}Reducer(state: ${name}ContextType, action: Action<${name}Actions, any>) {
    switch (action.type) {
      ${actions
        .map(
          (action: any) =>
            `case ${name}Actions.${getValidVariableName(action)}:
            return { ...state, ${getValidVariableName(
              action
            )}: action.payload };`
        )
        .join("\n")}
      default:
        return state;
    }
  }
  
  `,
    {
      parser: "typescript",
      plugins: [typescript, babel],
    }
  );
};
