import { useContext, createContext } from "react";
import { IAuthUser } from "../../Auth.types";

export type UserState = {
  user: IAuthUser | null;
};

export type StateActions = {
  setUser: (user: IAuthUser | null) => void;
  resetState: () => void;
};

export const UserContext = createContext<readonly [UserState, StateActions]>(
  undefined as any
);
UserContext.displayName = "UserContext";

export const useUserContext = (): readonly [UserState, StateActions] => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error(
      "useUserContext must be used within a UserContext provider"
    );
  }

  return context;
};
