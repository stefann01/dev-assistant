import Property from "../Models/Properties.model";
import prettier from "prettier/standalone";
import babel from "prettier/parser-babel";
import typescript from "prettier/parser-typescript";
import { capitalize } from "../helper/helper";

export type TSTemplateType = {
  entityName?: string;
  properties: Property[];
  entityType?: "class" | "builder";
};

// Read this for builder: https://stackoverflow.com/questions/4313172/builder-design-pattern-why-do-we-need-a-director#:~:text=The%20StringBuilder%20class%20in%20the,does%20not%20include%20a%20director.

export const TSTemplate = ({
  entityName: clasName,
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
    `class ${clasName} { 
        ${staticFields
          .map(
            (field) =>
              `${field.access} static ${field.isReadonly ? "readonly" : ""} ${
                field.name
              }:${field.type} = ${field.defaultValue}'' \n`
          )
          .join("")}
        constructor(${normalFields
          .map(
            (prop, index) =>
              `${prop.access} ${prop.isReadonly ? "readonly " : ""}${
                prop.name
              }:${prop.type} ${index < properties.length - 1 ? "," : ""}  
          `
          )
          .join("")}) { }

          ${
            entityType &&
            entityType === "builder" &&
            normalFields
              .filter((field) => !field.isStatic || !field.isFunction)
              .map(
                (field) =>
                  `set${capitalize(field.name)}(${field.name}:${
                    field.type
                  }){this.${field.name} = ${field.name}; return this;} \n 
                  get${capitalize(field.name)}(): ${field.type}{ return this.${
                    field.name
                  }}`
              )
              .join("")
          }

      ${functions
        .map(
          (func) =>
            `${func.access} ${func.isStatic ? "static" : ""} ${
              func.name
            }(){} \n`
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
          `${prop.isReadonly ? "readonly" : ""} ${prop.name}:${prop.type},  
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
