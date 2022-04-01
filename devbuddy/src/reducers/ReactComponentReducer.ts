import Action from "../Models/Action.model";

enum ReactComponentActions {
  EDIT_NAME,
  CHANGE_STYLE_MODE,
  TOGGLE_STYLE_MODULE,
  ADD_PROP,
  EDIT_PROP,
  REMOVE_PROP,
  ADD_STATE,
  EDIT_STATE,
  REMOVE_STATE,
  ADD_EFFECT,
  TOGGLE_EFFECT_CLEANUP_FUNCTION,
  TOGGLE_EFFECT_DEP_ARRAY,
  ADD_DEP_ARRAY_ITEM,
  REMOVE_DEP_ARRAY_ITEM,
}
export { ReactComponentActions };

type ReactProp = {
  name: string;
  type: string;
};

type ReactState = {
  name: string;
  defaultValue: any;
};

type ReactEffect = {
  hasCleanUpFunction: boolean;
  hasDependencyArray: boolean;
  depArray: string[];
};

type ReactComponentState = {
  name: string;
  cssMode: "css" | "scss";
  isStyleModule: boolean;
  props: ReactProp[];
  states: ReactState[];
  effects: ReactEffect[];
};

export function ReactComponentReducer(
  state: ReactComponentState,
  action: Action<ReactComponentActions, any>
): ReactComponentState {
  switch (action.type) {
    case ReactComponentActions.ADD_PROP:
      return {
        ...state,
        props: [...state.props, { name: "newProp", type: "type" }],
      } as ReactComponentState;
    case ReactComponentActions.REMOVE_PROP:
      return {
        ...state,
        props: state.props.filter((p, i) => i !== action.payload.index),
      };
    case ReactComponentActions.EDIT_PROP:
      return {
        ...state,
        props: state.props.map((prop, index) => {
          if (index === action.payload.index) {
            return { ...action.payload.prop };
          }
          return prop;
        }),
      };
    case ReactComponentActions.ADD_STATE: {
      return {
        ...state,
        states: [...state.states, { name: "newState", defaultValue: "''" }],
      } as ReactComponentState;
    }
    case ReactComponentActions.REMOVE_STATE: {
      return {
        ...state,
        states: state.states.filter((s, i) => i !== action.payload.index),
      } as ReactComponentState;
    }
    case ReactComponentActions.EDIT_STATE: {
      return {
        ...state,
        states: state.states.map((s, i) => {
          if (i === action.payload.index) {
            return { ...action.payload.state };
          }
          return s;
        }),
      } as ReactComponentState;
    }
    case ReactComponentActions.CHANGE_STYLE_MODE: {
      return {
        ...state,
        cssMode: action.payload.cssMode,
      } as ReactComponentState;
    }
    case ReactComponentActions.EDIT_NAME: {
      return {
        ...state,
        name: action.payload.name,
      };
    }
    case ReactComponentActions.TOGGLE_STYLE_MODULE: {
      return {
        ...state,
        isStyleModule: action.payload.isStyleModule,
      };
    }
    default:
      return state;
  }
}
