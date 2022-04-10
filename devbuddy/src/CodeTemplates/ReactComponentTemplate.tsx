import prettier from "prettier/standalone";
import babel from "prettier/parser-babel";
import typescript from "prettier/parser-typescript";
import { capitalize } from "../helper/helper";

const DEFAULT_COMPONENT_NAME = "MyComponent";
const DEFAULT_PROP_NAME = "prop";
const DEFAULT_PROP_TYPE = "type";

const getReactImports = ({ hasEffects, hasStates }: any) => {
  let hooks: string[] = [
    hasStates && "useState",
    hasEffects && "useEffect",
  ].filter(Boolean);

  return `import React ${
    hooks.length > 0 ? `, {${hooks.join(",")}}` : " "
  }  from "react";`;
};

const getStyleModeImport = ({ cssMode, isStyleModule, componentName }: any) => {
  return `import ${isStyleModule ? "styles from" : ""} './${
    componentName || DEFAULT_COMPONENT_NAME
  }.${isStyleModule ? "module." : ""}${cssMode}';`;
};

const getReactPropTypes = ({ props, componentName }: any) => {
  return `${
    props.length > 0
      ? `interface ${componentName || DEFAULT_COMPONENT_NAME}Props{\n
      ${props
        .map(
          (prop: any) =>
            `${prop.name || DEFAULT_PROP_NAME}:${
              prop.type || DEFAULT_PROP_TYPE
            };\n`
        )
        .join("")}}`
      : ""
  }`;
};

const getReactProps = ({ props, componentName }: any) => {
  return `${
    props.length > 0
      ? `{${props.map((p: any) => p.name || DEFAULT_PROP_NAME).join(",")}}:${
          componentName || DEFAULT_COMPONENT_NAME
        }Props`
      : ""
  }`;
};

export const ReactComponentTemplate = ({
  name,
  props,
  states,
  effects,
  cssMode,
  isStyleModule,
}: any) => {
  return prettier.format(
    `
    ${getReactImports({
      hasEffects: effects.length > 0,
      hasStates: states.length > 0,
    })} \n
    ${getStyleModeImport({ cssMode, isStyleModule, componentName: name })} \n
  
  ${getReactPropTypes({ props, componentName: name })} \n
    
  
  
  const ${capitalize(name) || DEFAULT_COMPONENT_NAME} = (${getReactProps({
      props,
      componentName: name,
    })})=>{
  
  ${
    states.length > 0
      ? states
          .map(
            (state: any) =>
              `const [${state.name}, set${state.name}] = useState(${state.defaultValue});`
          )
          .join("")
      : ""
  }
  
  ${
    effects.length > 0
      ? effects
          .map(
            (effect: any) =>
              `useEffect(()=>{ console.log("Your effect"); ${
                effect.hasCleanUpFunction
                  ? "return ()=>{console.log('Your cleanup');}"
                  : ""
              }} ${
                effect.hasDependencyArray
                  ? `,[${[...effect.depArray].join(",")}]`
                  : ""
              });`
          )

          .join("")
      : ""
  }
  
  
  
  return(
    <div>${name || "MyComponent"}</div>
  )
  
      }
         
    `,
    { parser: "typescript", plugins: [typescript, babel] }
  );
};
