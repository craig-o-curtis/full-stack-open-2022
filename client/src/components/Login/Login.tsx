import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Button, FormControl } from "../common";
import * as Styled from "./Login.styled";

type FormData = {
  username: string;
  password: string;
};

const Login = () => {
  // const { register, control, setValue, handleSubmit, reset, formState } =
  //   useForm<FormData>({ mode: "onChange" });
  // const onSubmit = handleSubmit((data) => console.log(data));

  const methods = useForm();
  const onSubmit = (data: any) => console.log(data);
  // firstName and lastName will have correct type

  console.log("formState", methods.formState.errors);

  return (
    <Styled.FormPage>
      <Styled.FormWrapper>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
            <FormControl
              name="username"
              label="Username:"
              type="text"
              autoComplete="off"
              required
              placeholder="Enter a unique username..."
            />

            <FormControl
              name="password"
              label="Password:"
              type="password"
              autoComplete="new-password"
              required
              placeholder="Enter a password..."
            />

            <Button
              type="submit"
              onClick={() => {
                // methods.reset();
              }}
            >
              Submit
            </Button>

            <DevTool control={methods.control} />
          </form>
        </FormProvider>
      </Styled.FormWrapper>
    </Styled.FormPage>
  );
};

export default Login;
