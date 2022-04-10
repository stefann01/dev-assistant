import { UserCredential } from "firebase/auth";
import Action from "../Models/Action.model";

enum UserAction {
  SET_USER,
  REMOVE_USER,
}

export { UserAction };

type UserReducerState = {
  user: UserCredential | null;
};

export default function UserReducer(
  state: UserReducerState,
  action: Action<UserAction, any>
) {
  switch (action.type) {
    case UserAction.SET_USER: {
      return { ...state, user: action.payload.user };
    }

    case UserAction.REMOVE_USER: {
      return { ...state, user: null };
    }

    default: {
      return state;
    }
  }
}
