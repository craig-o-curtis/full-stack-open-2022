import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  AppLoader,
  Form,
  FormControl,
  FormSubmitButton,
} from 'components/common';

import * as Styled from './Login.styled';
import { useUserContext } from 'auth/AuthProvider';
import { useLoginUserMutation } from 'auth/hooks';
import { ILoginUser } from 'auth';

const Login = () => {
  const { mutateAsync: loginUser, isLoading } = useLoginUserMutation();
  const navigate = useNavigate();
  const [, actions] = useUserContext();

  const handleSubmit = async (data: ILoginUser) => {
    try {
      const currentUser = await loginUser(data);
      // ** dispatch to context
      if (currentUser) {
        actions.setUser(currentUser);
        navigate('/home', { replace: true });
      }
    } catch (error) {
      console.error('Error', error);
    }
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
              placeholder="Enter username..."
            />

            <FormControl
              name="password"
              label="Password:"
              type="password"
              autoComplete="new-password"
              required
              minLength={3}
              placeholder="Enter password..."
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
