import { useLocalStorage, useReadLocalStorage } from '../../hooks';
import { IAuthUser } from '../Auth.types';

export const LS_USER_KEY = 'uhel-fullstack2022currentUser';

export const useLocalStorageCurrentUser = (): {
  lsUser: IAuthUser | null;
  setLsUser: any;
  clearLS: any;
} => {
  const [lsUser, setLsUser] = useLocalStorage(LS_USER_KEY, null);

  // ** Homework Part 5.a Exercise 5.2 - confirmed local storage cleared
  const clearLS = () => {
    window.localStorage.removeItem(LS_USER_KEY);
  };

  return {
    lsUser,
    setLsUser,
    clearLS,
  };
};

export const useReadLocalStorageCurrentUser = () => {
  const lsUser = useReadLocalStorage(LS_USER_KEY);
  return lsUser;
};
