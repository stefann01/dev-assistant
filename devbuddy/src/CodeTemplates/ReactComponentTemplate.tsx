import prettier from "prettier/standalone";
import babel from "prettier/parser-babel";
import typescript from "prettier/parser-typescript";
import {
  getValidDefaultValue,
  getValidTypeName,
  getValidVariableName,
} from "../helper/helper";

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

const getReactState = (states: any) => {
  return states.length > 0
    ? states
        .map(
          (state: any) =>
            `const [${getValidVariableName(
              state.name
            )}, set${getValidVariableName(
              state.name
            )}] = useState(${getValidDefaultValue(state.defaultValue)});`
        )
        .join("")
    : "";
};

const getReactEffects = (effects: any) => {
  return effects.length > 0
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
    : "";
};

const getReactRefs = (refs: any) => {
  return refs.length > 0
    ? refs
        .map(
          (ref: any) =>
            `const ${getValidVariableName(
              ref.name
            )} = useRef(${getValidDefaultValue(ref.defaultValue)});`
        )
        .join("")
    : "";
};

export const ReactComponentTemplate = ({
  name,
  props,
  states,
  effects,
  refs,
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
  
  ${getReactState(states)}

  ${getReactRefs(refs)}
  
  ${getReactEffects(effects)}
  return(
    <div>${name}</div>
  )
  
      }
         
    `,
    { parser: "typescript", plugins: [typescript, babel] }
  );
};
