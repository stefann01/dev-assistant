import Property from "../Models/Properties.model";
import prettier from "prettier/standalone";
import babel from "prettier/parser-babel";
import typescript from "prettier/parser-typescript";
import {
  capitalize,
  getValidTypeName,
  getValidVariableName,
} from "../helper/helper";

export type TSTemplateType = {
  entityName?: string;
  properties: Property[];
  entityType?: "class" | "builder";
};

// Read this for builder: https://stackoverflow.com/questions/4313172/builder-design-pattern-why-do-we-need-a-director#:~:text=The%20StringBuilder%20class%20in%20the,does%20not%20include%20a%20director.

export const TSTemplate = ({
  entityName,
  properties,
  entityType,
}: TSTemplateType) => {
  const functions = properties.filter((prop) => prop.isFunction);
  const staticFields = properties.filter(
    (prop) => prop.isStatic && !prop.isFunction
  );
  const normalFields = properties.filter(
    (prop) => !prop.isStatic && !prop.isFunction
  );
  return prettier.format(
    `class ${entityName || "MyEntity"} { 
        ${staticFields
          .map(
            (field) =>
              `${field.access} static ${
                field.isReadonly ? "readonly" : ""
              } ${getValidVariableName(field.name)}:${getValidTypeName(
                field.type
              )} = ${field.defaultValue}'' \n`
          )
          .join("")}
        constructor(${normalFields
          .map(
            (prop, index) =>
              `${prop.access} ${
                prop.isReadonly ? "readonly " : ""
              }${getValidVariableName(prop.name)}:${getValidTypeName(
                prop.type
              )} ${index < properties.length - 1 ? "," : ""}  
          `
          )
          .join("")}) { }

          ${
            entityType && entityType === "builder"
              ? normalFields
                  .filter((field) => !field.isStatic || !field.isFunction)
                  .map((field) => {
                    const validFieldName = getValidVariableName(field.name);
                    const validFieldType = getValidTypeName(field.type);
                    return `set${capitalize(
                      validFieldName
                    )}(${validFieldName}:${validFieldType}){this.${validFieldName} = ${validFieldName}; return this;} \n 
                      get${capitalize(
                        validFieldName
                      )}(): ${validFieldType}{ return this.${validFieldName}}`;
                  })
                  .join("")
              : ""
          }

      ${functions
        .map(
          (func) =>
            `${func.access} ${
              func.isStatic ? "static" : ""
            } ${getValidVariableName(func.name)}(){} \n`
        )
        .join("")}
}`,
    {
      parser: "typescript",
      plugins: [typescript, babel],
    }
  );
};

export const TSInterfaceTemplate = ({
  entityName,
  properties,
}: TSTemplateType) => {
  const functions = properties.filter((prop) => prop.isFunction);
  const normalFields = properties.filter((prop) => !prop.isFunction);
  return prettier.format(
    `interface ${entityName}{
    ${normalFields
      .map(
        (prop) =>
          `${prop.isReadonly ? "readonly" : ""} ${getValidVariableName(
            prop.name
          )}:${getValidTypeName(prop.type)},  
          `
      )
      .join("")} \n
      ${functions.map((prop) => `${prop.name}():${prop.type}`).join("")} \n
  }`,
    {
      parser: "typescript",
      plugins: [typescript, babel],
    }
  );
};

export const ReactComponentTestTemplate: (data: any) => string = ({
  name,
  props,
}: any) =>
  prettier.format(
    `
    import React from "react";
import ${name} from './${name}';
import {mount} from "enzyme";

describe('${name} test', ()=>{

  ${props.length > 0 ? "let props;" : ""}

  beforeEach(()=>{
${
  props.length > 0
    ? ` props = {
${props.map((prop: any) => `${getValidVariableName(prop.name)}: ''`)}}`
    : ""
}
  })

  test('snapshot test', ()=>{
    const wrapper = mount(<${name} {...props}/>);
    expect(wrapper).toMatchSnapshot();
  })
})
`,
    {
      parser: "typescript",
      plugins: [typescript, babel],
    }
  );
