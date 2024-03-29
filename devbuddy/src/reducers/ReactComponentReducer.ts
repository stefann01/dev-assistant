import Action from "../Models/Action.model";
import {
  ReactEffect,
  ReactProp,
  ReactRef,
  ReactState,
} from "../Models/ReactTypes";

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
  REMOVE_EFFECT,
  TOGGLE_EFFECT_CLEANUP_FUNCTION,
  TOGGLE_EFFECT_DEP_ARRAY,
  ADD_EFFECT_DEPENDENCY,
  REMOVE_DEP_ARRAY_ITEM,
  TOGGLE_SECTION_VISIBILITY,
  ADD_REF,
  REMOVE_REF,
  EDIT_REF,
}

type ReactComponentState = {
  name: string;
  cssMode: "css" | "scss";
  isStyleModule: boolean;
  props: ReactProp[];
  states: ReactState[];
  effects: ReactEffect[];
  refs: ReactRef[];
  arePropsVisible: boolean;
  areStatesVisible: boolean;
  areEffectsVisible: boolean;
  areRefsVisible: boolean;
};

export { ReactComponentActions };
export type { ReactComponentState };

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
    case ReactComponentActions.ADD_EFFECT: {
      return {
        ...state,
        effects: [
          ...state.effects,
          { hasCleanUpFunction: false, hasDependencyArray: true, depArray: [] },
        ],
      };
    }
    case ReactComponentActions.TOGGLE_EFFECT_CLEANUP_FUNCTION: {
      return {
        ...state,
        effects: state.effects.map((effect, i) => {
          if (i === action.payload.index) {
            return {
              ...effect,
              hasCleanUpFunction: !effect.hasCleanUpFunction,
            };
          }
          return effect;
        }),
      };
    }
    case ReactComponentActions.TOGGLE_EFFECT_DEP_ARRAY: {
      return {
        ...state,
        effects: state.effects.map((effect, i) => {
          if (i === action.payload.index) {
            return {
              ...effect,
              hasDependencyArray: !effect.hasDependencyArray,
            };
          }
          return effect;
        }),
      };
    }

    case ReactComponentActions.REMOVE_EFFECT: {
      return {
        ...state,
        effects: state.effects.filter((e, i) => i !== action.payload.index),
      };
    }

    case ReactComponentActions.ADD_EFFECT_DEPENDENCY: {
      return {
        ...state,
        effects: state.effects.map((effect, i) => {
          if (i === action.payload.index) {
            return {
              ...effect,
              depArray: [...effect.depArray, action.payload.dependency],
            };
          }
          return effect;
        }),
      };
    }

    case ReactComponentActions.REMOVE_DEP_ARRAY_ITEM: {
      return {
        ...state,
        effects: state.effects.map((effect, i) => {
          if (i === action.payload.index) {
            return {
              ...effect,
              depArray: effect.depArray.filter(
                (dep, i) => i !== action.payload.depIndex
              ),
            };
          }
          return effect;
        }),
      };
    }

    case ReactComponentActions.TOGGLE_SECTION_VISIBILITY: {
      switch (action.payload.section) {
        case "props":
          return {
            ...state,
            arePropsVisible: !state.arePropsVisible,
          };
        case "states":
          return {
            ...state,
            areStatesVisible: !state.areStatesVisible,
          };
        case "effects":
          return {
            ...state,
            areEffectsVisible: !state.areEffectsVisible,
          };
        case "refs":
          return {
            ...state,
            areRefsVisible: !state.areRefsVisible,
          };
        default:
          return state;
      }
    }

    case ReactComponentActions.ADD_REF: {
      return {
        ...state,
        refs: [...state.refs, { name: "newRef", defaultValue: "type" }],
      } as ReactComponentState;
    }

    case ReactComponentActions.EDIT_REF: {
      return {
        ...state,
        refs: state.refs.map((ref, index) => {
          if (index === action.payload.index) {
            return { ...action.payload.ref };
          }
          return ref;
        }),
      };
    }

    case ReactComponentActions.REMOVE_REF: {
      return {
        ...state,
        refs: state.refs.filter((r, i) => i !== action.payload.index),
      } as ReactComponentState;
    }

    default:
      return state;
  }
}
