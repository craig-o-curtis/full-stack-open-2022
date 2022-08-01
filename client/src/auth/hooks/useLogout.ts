import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { useUserContext } from "../AuthProvider";
import { queryKey } from "./useRefreshTokenQuery";

export const useLogout = () => {
  const [, actions] = useUserContext();
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  // ** destroy
  const logout = useCallback(() => {
    // ** remove from user context and ls
    console.log("set store as null");

    actions.setUser(null);
    // ** invalidate query client
    console.log("remove query");
    queryClient.removeQueries(queryKey);

    // ** pop a toast
    toast.success("Logged out");
    // ** redirect to login page
    console.log("navigating");
    navigate("/login");
  }, [actions, navigate, queryClient]);

  return logout;
};
