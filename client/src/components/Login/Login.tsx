import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppLoader, Form, FormControl, FormSubmitButton } from "../common";
import { ILoginUser } from "./Login.types";
import { useLoginUserMutation } from "./hooks";
import * as Styled from "./Login.styled";
import { useUserContext } from "../../auth/AuthProvider";

const Login = () => {
  const { mutateAsync: postUser, isLoading } = useLoginUserMutation();
  const navigate = useNavigate();
  const [state, actions] = useUserContext();

  console.log("check user actions...", actions);
  console.log("check user state...", state);

  const handleSubmit = async (data: ILoginUser) => {
    console.log("need to type", data);
    // ** For existing users
    // ** Just need to do post to /login and get token
    // ** token can be stored in RQ???
    const currentUser = await postUser(data);
    // ** dispatch to context
    if (currentUser) {
      actions.setUser(currentUser);
    }
    navigate("/");
  };

  return (
    <AppLoader isLoading={isLoading}>
      <Styled.FormPage>
        <Styled.FormWrapper>
          <Form onSubmit={handleSubmit} debug>
            <FormControl
              name="username"
              label="Username:"
              type="text"
              autoComplete="off"
              required
              minLength={3}
              placeholder="Enter a unique username..."
            />

            <FormControl
              name="password"
              label="Password:"
              type="password"
              autoComplete="new-password"
              required
              minLength={3}
              placeholder="Enter a password..."
            />

            <Styled.FormFooter flex justifyContent="space-between">
              <NavLink to="/signup">Register for account</NavLink>
              <FormSubmitButton>Submit</FormSubmitButton>
            </Styled.FormFooter>
          </Form>
        </Styled.FormWrapper>
      </Styled.FormPage>
    </AppLoader>
  );
};

export default Login;
