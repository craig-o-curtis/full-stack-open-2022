import { useMemo } from 'react';

import { AxiosRequestConfig } from 'axios';

import { useUserContext } from '../AuthProvider';
import { useLocalStorageCurrentUser } from '../hooks';

export type AuthTokenConfig =
  | AxiosRequestConfig<any>
  | { headers: { Authorization: string } }
  | undefined;

export const useAuthTokenConfig = () => {
  const [{ user }] = useUserContext();
  const { lsUser } = useLocalStorageCurrentUser();
  const token = user?.token || lsUser?.token;

  const config = useMemo(
    () =>
      !token
        ? undefined
        : {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
    [token]
  );

  return config;
};
