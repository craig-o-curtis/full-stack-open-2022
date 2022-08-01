import { AxiosRequestConfig } from "axios";
import { useMemo } from "react";
import { useUserContext } from "../AuthProvider";

export type AuthTokenConfig =
  | AxiosRequestConfig<any>
  | { headers: { Authorization: string } }
  | undefined;

export const useAuthTokenConfig = () => {
  const [{ user }] = useUserContext();

  const config = useMemo(
    () =>
      !user
        ? undefined
        : {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          },
    [user]
  );

  return config;
};
