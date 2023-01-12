import React, { useMemo } from 'react';

import { IAuthUser } from '../Auth.types';
import { useLocalStorageCurrentUser } from '../hooks';
import { StateActions, UserContext } from './context/UserContext';
import { useAuthReducer } from './hooks';

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
