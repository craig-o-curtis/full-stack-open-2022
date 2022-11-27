import React, { useMemo } from 'react';

import { UserContext, StateActions } from './context/UserContext';
import { IAuthUser } from '../Auth.types';
import { useAuthReducer } from './hooks';
import { useLocalStorageCurrentUser } from '../hooks';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useAuthReducer();
  const { setLsUser, clearLS } = useLocalStorageCurrentUser();

  const actions = useMemo((): StateActions => {
    const setUser = (user: IAuthUser | null) => {
      dispatch({ type: 'setUser', value: user });
      setLsUser(user as any);
    };

    const resetState = () => {
      dispatch({ type: 'resetState' });
      setLsUser(null);
      clearLS();
    };

    return {
      setUser,
      resetState,
    };
  }, [dispatch, setLsUser, clearLS]);

  return (
    <UserContext.Provider value={[state, actions]}>
      {children}
    </UserContext.Provider>
  );
};
