import { useContext, createContext } from "react";

export type IAuthUser = {
  name: string;
  token: string;
  username: string;
};

export type UserState = {
  user?: IAuthUser;
};

export type StateActions = {
  setUser: (user: IAuthUser) => any;
  resetState: () => any;
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
