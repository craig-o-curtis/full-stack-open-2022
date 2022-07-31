import { useReducer } from "react";

import { UserState, IAuthUser } from "../context/UserContext";

export type Actions =
  | {
      type: "setUser";
      value: IAuthUser;
    }
  | {
      type: "resetState";
    };

export const initialState: UserState = {
  user: undefined,
};

const stateInitializer = (state: UserState) => {
  // ** TODO get from local storage

  return {
    ...state,
  };
};

function authReducer(state: UserState, action: Actions): UserState {
  switch (action.type) {
    case "setUser":
      return {
        ...state,
        user: action.value,
      };
    case "resetState":
      return stateInitializer(initialState);
    default:
      return state;
  }
}

export function useAuthReducer() {
  return useReducer(authReducer, initialState, stateInitializer);
}
