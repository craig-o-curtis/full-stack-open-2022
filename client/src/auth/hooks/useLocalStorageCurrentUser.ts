import { useLocalStorage, useReadLocalStorage } from "../../hooks";
import { IAuthUser } from "../Auth.types";

export const LS_USER_KEY = "uhel-fullstack2022currentUser";

export const useLocalStorageCurrentUser = (): {
  lsUser: IAuthUser | null;
  setLsUser: any;
} => {
  const [lsUser, setLsUser] = useLocalStorage(LS_USER_KEY, null);

  return {
    lsUser,
    setLsUser,
  };
};

export const useReadLocalStorageCurrentUser = () => {
  const lsUser = useReadLocalStorage(LS_USER_KEY);
  return lsUser;
};
