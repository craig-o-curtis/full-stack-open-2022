import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useUserContext } from "../AuthProvider";
import { useLocalStorageCurrentUser } from "../hooks";
import { useRefreshTokenQuery } from "../hooks/useRefreshTokenQuery";

interface AuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute = React.memo(function ({ children }: AuthRouteProps) {
  const navigate = useNavigate();
  const [{ user }, actions] = useUserContext();
  const { lsUser } = useLocalStorageCurrentUser();
  const token = user?.token || lsUser?.token;

  // TODO user token and browser refreshing, redirect, LS clearing needs love

  const { data, isLoading, isError, error } = useRefreshTokenQuery();

  useEffect(() => {
    if (!isLoading && data) {
      if (token !== data.token) {
        actions.setUser(data);
      }
    }
  }, [isLoading, data, actions, token]);

  useEffect(() => {
    if (isError || error) {
      navigate("/login", { replace: true });
      actions.setUser(null);
    }
  }, [isError, error, navigate, actions, isLoading, data]);

  useEffect(() => {
    if (!isLoading && !data) {
      navigate("/login", { replace: true });
      actions.setUser(null);
    }
  }, [actions, data, isLoading, navigate]);

  return <>{!isLoading && data && <>{children}</>}</>;
});

export default AuthRoute;
