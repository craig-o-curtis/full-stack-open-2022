import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { useUserContext } from '../AuthProvider';
import { queryKey } from './useRefreshTokenQuery';

export const useLogout = () => {
  const [, actions] = useUserContext();
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  // ** destroy
  const logout = useCallback(() => {
    // ** remove from user context and ls
    actions.resetState();
    // ** invalidate query client
    queryClient.removeQueries(queryKey);

    // ** pop a toast
    toast.success('Logged out');
    // ** redirect to login page
    navigate('/login');
  }, [actions, navigate, queryClient]);

  return logout;
};
