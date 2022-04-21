import prettier from "prettier/standalone";
import babel from "prettier/parser-babel";
import typescript from "prettier/parser-typescript";
import { getValidTypeName, getValidVariableName } from "../helper/helper";

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
  return `import ${isStyleModule ? "styles from" : ""} './${componentName}.${
    isStyleModule ? "module." : ""
  }${cssMode}';`;
};

const getReactPropTypes = ({ props, componentName }: any) => {
  return `${
    props.length > 0
      ? `interface ${componentName}Props{\n
      ${props
        .map(
          (prop: any) =>
            `${getValidVariableName(prop.name)}:${getValidTypeName(
              prop.type
            )};\n`
        )
        .join("")}}`
      : ""
  }`;
};

const getReactProps = ({ props, componentName }: any) => {
  return `${
    props.length > 0
      ? `{${props
          .map((p: any) => getValidVariableName(p.name))
          .join(",")}}:${componentName}Props`
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
    
  
  
  const ${name} = (${getReactProps({
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
