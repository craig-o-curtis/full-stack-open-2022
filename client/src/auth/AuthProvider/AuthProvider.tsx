import React, { useMemo } from "react";

import { UserContext, StateActions, IAuthUser } from "./context/UserContext";
import { useAuthReducer } from "./hooks";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useAuthReducer();

  const actions = useMemo((): StateActions => {
    const setUser = (user: IAuthUser) => {
      dispatch({ type: "setUser", value: user });
    };
    const resetState = () => {
      dispatch({ type: "resetState" });
    };

    return {
      setUser,
      resetState,
    };
  }, [dispatch]);

  return (
    <UserContext.Provider value={[state, actions]}>
      {children}
    </UserContext.Provider>
  );
};
