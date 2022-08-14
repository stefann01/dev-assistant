import Action from "../Models/Action.model";

export enum ReactContextActions {
  ADD_PROP,
  REMOVE_PROP,
  EDIT_ACTION_NAME,
  ADD_ACTION,
  REMOVE_ACTION,
  EDIT_PROP,
  EDIT_NAME,
  EDIT,
}

type ContextProp = {
  name: string;
  type: "string" | "number" | "boolean" | "object" | "array";
  defaultValue: any;
};

export type ReactContextState = {
  name: string;
  actions: string[];
  props: ContextProp[];
  stateName: string;
};

export function ReactContextReducer(
  state: ReactContextState,
  action: Action<ReactContextActions, any>
): ReactContextState {
  switch (action.type) {
    case ReactContextActions.ADD_PROP:
      return {
        ...state,
        props: [...state.props, { name: "newProp", type: "type" }],
      } as ReactContextState;
    case ReactContextActions.REMOVE_PROP:
      return {
        ...state,
        props: state.props.filter((p, i) => i !== action.payload.index),
      };
    case ReactContextActions.EDIT_PROP:
      debugger;
      return {
        ...state,
        props: state.props.map((prop, index) => {
          if (index === action.payload.index) {
            return { ...action.payload.prop };
          }
          return prop;
        }),
      };
    case ReactContextActions.EDIT_NAME: {
      return {
        ...state,
        name: action.payload.name,
      } as ReactContextState;
    }
    case ReactContextActions.ADD_ACTION: {
      return {
        ...state,
        actions: [...state.actions, "NEW_ACTION"],
      } as ReactContextState;
    }
    case ReactContextActions.EDIT_ACTION_NAME: {
      return {
        ...state,
        actions: state.actions.map((act, index) => {
          if (index === action.payload.index) {
            return action.payload.name;
          }
          return act;
        }),
      } as ReactContextState;
    }
    case ReactContextActions.REMOVE_ACTION: {
      return {
        ...state,
        actions: state.actions.filter((a, i) => i !== action.payload.index),
      } as ReactContextState;
    }
    default:
      return state;
  }
}
