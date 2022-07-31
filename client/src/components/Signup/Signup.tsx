import { Form, FormControl, FormSubmitButton } from "../common";
import { NavLink } from "react-router-dom";
import { ISignupUser } from "./Signup.types";
import * as Styled from "./Signup.styled";

const Signup = () => {
  const handleSubmit = (data: ISignupUser) => {
    console.log("need to type", data);
    console.log("signup stuff");
    // ** need to do new endpoint in BE
    // ** 1 post to users with creds
    // ** send token back in RQ
    // ** also somehow get current user ID
  };

  return (
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
  );
};

export default Signup;
