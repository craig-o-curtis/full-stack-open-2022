import { NavLink, useNavigate } from 'react-router-dom';

import { ISignupUser } from 'auth';

import { useUserContext } from 'auth/AuthProvider';
import { useSignupUserMutation } from 'auth/hooks';

import {
  AppLoader,
  Form,
  FormControl,
  FormSubmitButton,
} from 'components/common';

import * as Styled from './Signup.styled';

const Signup = () => {
  const { mutateAsync: createUser, isLoading } = useSignupUserMutation();
  const navigate = useNavigate();
  const [, actions] = useUserContext();

  const handleSubmit = async (data: ISignupUser) => {
    try {
      const createdUser = await createUser(data);
      // ** dispatch to context
      if (createdUser) {
        actions.setUser(createdUser);
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
              placeholder="Enter a unique username..."
            />

            <FormControl
              name="name"
              label="Name:"
              type="text"
              autoComplete="off"
              required
              minLength={3}
              placeholder="Enter a name..."
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
              <NavLink to="/login">Already have an account?</NavLink>
              <FormSubmitButton>Submit</FormSubmitButton>
            </Styled.FormFooter>
          </Form>
        </Styled.FormWrapper>
      </Styled.FormPage>
    </AppLoader>
  );
};

export default Signup;
