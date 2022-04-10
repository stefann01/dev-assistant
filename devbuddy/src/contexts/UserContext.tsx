import React, { useReducer } from "react";
import { UserCredential } from "firebase/auth";
import Action from "../Models/Action.model";
import UserReducer, { UserAction } from "../reducers/UserReducer";

type UserContextType = {
  user: UserCredential;
  dispatch: React.Dispatch<Action<UserAction, any>>;
};

const UserContext = React.createContext({} as UserContextType);

export default function UserProvider(props: any) {
  const [state, dispatch] = useReducer(UserReducer, {
    user: null,
  });

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        dispatch,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return React.useContext(UserContext);
}
