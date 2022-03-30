export const capitalize = (str: string, locale = navigator.language) =>
  str.charAt(0).toLocaleUpperCase(locale) + str.slice(1);
