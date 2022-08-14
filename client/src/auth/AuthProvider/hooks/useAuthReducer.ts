import { useReducer } from "react";
import { UserState } from "../context/UserContext";
import { IAuthUser } from "../../Auth.types";

export type Actions =
  | {
      type: "setUser";
      value: IAuthUser | null;
    }
  | {
      type: "resetState";
    };

export const initialState: UserState = {
  user: null,
};

const stateInitializer = (state: UserState) => {
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
