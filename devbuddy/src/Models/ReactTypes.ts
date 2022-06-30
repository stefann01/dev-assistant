export type ReactProp = {
  name: string;
  type: string;
};

export type ReactState = {
  name: string;
  defaultValue: any;
};

export type ReactEffect = {
  hasCleanUpFunction: boolean;
  hasDependencyArray: boolean;
  depArray: string[];
};

export type ReactRef = {
  name: string;
  defaultValue: any;
};
