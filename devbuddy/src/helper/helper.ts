import {
  DEFAULT_COMPONENT_NAME,
  DEFAULT_PROP_NAME,
  DEFAULT_PROP_TYPE,
} from "./constants";

const reservedTypeNames = [
  "any",
  "boolean",
  "number",
  "string",
  "void",
  "undefined",
  "null",
  "never",
  "object",
  "symbol",
  "function",
  "unknown",
];

const reservedKeyWords = [
  "abstract",
  "any",
  "as",
  "async",
  "await",
  "boolean",
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "declare",
  "default",
  "delete",
  "do",
  "else",
  "enum",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "from",
  "function",
  "get",
  "if",
  "implements",
  "import",
  "in",
  "instanceof",
  "interface",
  "is",
  "let",
  "module",
  "namespace",
  "never",
  "new",
  "null",
  "number",
  "object",
  "package",
  "private",
  "protected",
  "public",
  "readonly",
  "require",
  "global",
  "return",
  "set",
  "static",
  "string",
  "super",
  "switch",
  "this",
  "throw",
  "true",
  "try",
  "type",
  "typeof",
  "var",
  "void",
  "while",
  "with",
  "yield",
];

const notTypeReservedKeyWords = reservedKeyWords.filter(
  (keyword) => !reservedTypeNames.includes(keyword)
);

export const capitalize = (str: string, locale = navigator.language) =>
  str.charAt(0).toLocaleUpperCase(locale) + str.slice(1);

export const isValidVariableName = (str: string) => {
  const regex = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
  return regex.test(str);
};

export const isValidTypeName = (str: string) => {
  const regex = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
  return regex.test(str) || reservedTypeNames.includes(str);
};

export const isReservedKeyWord = (str: string) => {
  return reservedKeyWords.includes(str);
};

export const getValidComponentName = (name: string) => {
  return isValidVariableName(capitalize(name))
    ? capitalize(name)
    : DEFAULT_COMPONENT_NAME;
};

export const getValidVariableName = (name: string) => {
  return isValidVariableName(name) && !isReservedKeyWord(name)
    ? name
    : DEFAULT_PROP_NAME;
};

export const getValidTypeName = (name: string) => {
  return isValidTypeName(name) && !notTypeReservedKeyWords.includes(name)
    ? name
    : DEFAULT_PROP_TYPE;
};

export const getValidDefaultValue = (value: any) => {
  if (!value) {
    return "";
  }
  if (Number(value)) {
    return value;
  }
  if (typeof value === "boolean") {
    return value;
  }

  try {
    return JSON.stringify(JSON.parse(value));
  } catch (e) {
    if (typeof value === "string") {
      return `\`${value}\``;
    }
    return "";
  }
};

export const isValidObjectPropertyOrProperty = (str: string) => {
  const matches = str.match(
    /(([a-zA-Z0-9_$])+(\.{1})?)*([a-zA-Z_$])+([0-9]*)/g
  );
  return matches && matches.length === 1 && matches[0] === str;
};

export const isValidDependencyArrayItem = (str: string) => {
  return isValidObjectPropertyOrProperty(str) && !isReservedKeyWord(str);
};
