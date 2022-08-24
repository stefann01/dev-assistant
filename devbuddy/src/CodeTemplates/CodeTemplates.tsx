import Property from "../Models/Properties.model";
import prettier from "prettier/standalone";
import babel from "prettier/parser-babel";
import typescript from "prettier/parser-typescript";
import {
  capitalize,
  colorCode,
  getValidTypeName,
  getValidVariableName,
} from "../helper/helper";

export type TSTemplateType = {
  entityName?: string;
  properties: Property[];
  entityType?: "class" | "builder";
};

const getStaticFieldsSnippet = (properties: Property[]) => {
  return properties
    .map((property) => {
      return `<token#569CD6>${
        property.access
      }</token><token#569CD6> static</token>${
        property.isReadonly ? "<token#569CD6> readonly</token>" : ""
      }<token#9CDCFE> ${getValidVariableName(
        property.name
      )}</token>:<token#4EC9B0>${getValidTypeName(
        property.type
      )}</token> = <token#C8C8C8>${property.defaultValue}</token>; \n\t`;
    })
    .join("");
};

const getFunctionsSnippet = (properties: Property[]) => {
  return properties
    .map(
      (func) =>
        `\t<token#569CD6>${func.access}</token>${
          func.isStatic ? " <token#569CD6>static</token>" : ""
        }<token#DCDCAA> ${getValidVariableName(
          func.name,
          "func"
        )}</token>(): <token#4EC9B0>${getValidTypeName(func.type)}</token> {}\n`
    )
    .join("");
};

const getConstructorSnippet = (properties: Property[]) => {
  //WARNING: This is a hack to get the code to look good in the editor. Do not edit the format of the code below.
  // prettier-ignore
  return `<token#569CD6>constructor</token>(${
    properties.length > 0
      ? '\n'+properties
          .map((property, index) => {
            return `\t\t<token#569CD6>${property.access}${
              property.isReadonly ? " readonly" : ""
            }</token><token#9CDCFE> ${getValidVariableName(
              property.name
            )}</token>:<token#4EC9B0>${getValidTypeName(
              property.type
            )}</token> = <token#C8C8C8>${property.defaultValue}</token>, \n`;
          })
          .join("")
      : ""}\t){}`;
};

const getBuilderFunctionsSnippet = (properties: Property[]) => {
  return properties
    .map((field, index) => {
      const validFieldName = getValidVariableName(field.name);
      const validFieldType = getValidTypeName(field.type);
      return `<token#DCDCAA>set${capitalize(
        validFieldName
      )}</token>(<token#9CDCFE>${validFieldName}</token>:<token#4EC9B0>${validFieldType}</token>){
        \t<token#569CD6>this</token>.<token#9CDCFE>${validFieldName}</token> = <token#9CDCFE>${validFieldName}</token>; 
        \t<token#C586C0>return</token> <token#569CD6>this</token>;
        }
        <token#DCDCAA>get${capitalize(
          validFieldName
        )}</token>(): <token#4EC9B0>${validFieldType}</token>{ 
        \t<token#C586C0>return</token> <token#569CD6>this</token>.<token#9CDCFE>${validFieldName}</token>
        }\n${index < properties.length - 1 ? "\t " : ""}`;
    })
    .join("");
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
  //WARNING: This is a hack to get the code to look good in the editor. Do not edit the format of the code below.
  // prettier-ignore
  return colorCode(
    `<token#4FC1FF>class</token> <token#4EC9B0>${entityName}</token> {
\t${staticFields.length > 0 ? getStaticFieldsSnippet(staticFields)+'\n' : ""}
\t${getConstructorSnippet(normalFields)}\n
\t${entityType && entityType === "builder"? getBuilderFunctionsSnippet(normalFields.filter((field) => !field.isStatic || !field.isFunction)): ""}\n
${functions.length > 0 ? getFunctionsSnippet(functions):''}\n}`);
};

export const TSInterfaceTemplate = ({
  entityName,
  properties,
}: TSTemplateType) => {
  const functions = properties.filter((prop) => prop.isFunction);
  const normalFields = properties.filter((prop) => !prop.isFunction);
  return colorCode(
    `<token#4FC1FF>interface</token> <token#4EC9B0>${entityName}</token> {
${
  normalFields.length > 0
    ? normalFields
        .map(
          (prop) =>
            `\t${
              prop.isReadonly ? "<token#4FC1FF>readonly</token>" : ""
            }<token#9CDCFE> ${getValidVariableName(
              prop.name
            )}</token>:<token#4EC9B0>${getValidTypeName(prop.type)}</token>,\n`
        )
        .join("") + "\n"
    : ""
}${
      functions.length
        ? functions
            .map(
              (prop) =>
                `\t<token#DCDCAA> ${getValidVariableName(
                  prop.name,
                  "func"
                )}</token>():<token#4EC9B0>${getValidTypeName(
                  prop.type
                )}</token>;\n`
            )
            .join("") + "\n"
        : ""
    }}`
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
