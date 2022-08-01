export type IAuthUser = {
  id: string;
  name: string;
  token: string;
  username: string;
};

export type ILoginUser = {
  username: string;
  password: string;
};

export type ISignupUser = {
  username: string;
  name: string;
  password: string;
};
