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
  // ** refresh token on every route nav
  const { data, isLoading, isError, error } = useRefreshTokenQuery(token);

  useEffect(() => {
    if (!isLoading && data) {
      if (token !== data.token) {
        console.log("am i setting again', data has id", data);
        actions.setUser(data);
      }
    }
  }, [isLoading, data, actions, token]);

  useEffect(() => {
    if (isError || error || (!isLoading && !data)) {
      navigate("/login", { replace: true });
      actions.setUser(null);
    }
  }, [isError, error, navigate, actions, isLoading, data]);

  return <>{!isLoading && data && <>{children}</>}</>;
});

export default AuthRoute;
