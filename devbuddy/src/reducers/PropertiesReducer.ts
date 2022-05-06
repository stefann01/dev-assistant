import Action from "../Models/Action.model";
import Property from "../Models/Properties.model";

enum PropertiesReducerActions {
  ADD_PROPERTY,
  REMOVE_PROPERTY,
  EDIT_PROPERTY,
  CHANGE_ENTITY_TYPE,
  CHANGE_ENTITY_NAME,
}

type PropertiesReducerState = {
  properties: Property[];
  entityName: string;
  entityType: "class" | "interface" | "builder";
};

export { PropertiesReducerActions };

export function PropertiesReducer(
  state: PropertiesReducerState,
  action: Action<PropertiesReducerActions, any>
): any {
  switch (action.type) {
    case PropertiesReducerActions.ADD_PROPERTY:
      return {
        ...state,
        properties: [...state.properties, new Property("propName", "propType")],
      };
    case PropertiesReducerActions.EDIT_PROPERTY: {
      return {
        ...state,
        properties: state.properties.map((property, index) => {
          if (index === action.payload.index) {
            //Readonly cannot be on a function
            if (action.payload.newProperty.isFunction) {
              action.payload.newProperty.isReadonly = false;
            }
            return action.payload.newProperty;
          }
          return property;
        }),
      };
    }
    case PropertiesReducerActions.REMOVE_PROPERTY: {
      return {
        ...state,
        properties: state.properties.filter(
          (prop, index) => index !== action.payload.index
        ),
      };
    }
    case PropertiesReducerActions.CHANGE_ENTITY_TYPE: {
      return {
        ...state,
        entityType: action.payload.entityType,
      };
    }
    case PropertiesReducerActions.CHANGE_ENTITY_NAME: {
      return {
        ...state,
        entityName: action.payload.entityName,
      };
    }
    default:
      return state;
  }
}
