import Property from "../Models/Properties.model";

export type TSTemplateType = {
  clasName?: string;
  properties: Property[];
};

export const TSTemplate = ({ clasName, properties }: TSTemplateType) => {
  const functions = properties.filter((prop) => prop.isFunction);
  const staticFields = properties.filter(
    (prop) => prop.isStatic && !prop.isFunction
  );
  const normalFields = properties.filter(
    (prop) => !prop.isStatic && !prop.isFunction
  );
  return `class ${clasName} { 
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
            (prop) =>
              `${prop.access} ${prop.isReadonly ? "readonly " : ""}${
                prop.name
              }:${prop.type},  
          `
          )
          .join("")}) { }

      ${functions
        .map(
          (func) =>
            `${func.access} ${func.isStatic ? "static" : ""} ${
              func.name
            }(){} \n`
        )
        .join("")}
}`;
};

export const TSInterfaceTemplate = ({
  clasName,
  properties,
}: TSTemplateType) => {
  return `interface TestInterface{
    ${properties
      .map(
        (prop) =>
          `${prop.name}:${prop.type},  
          `
      )
      .join("")}
  }`;
};
