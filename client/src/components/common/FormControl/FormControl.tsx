import React, { useEffect, HTMLInputTypeAttribute } from "react";
import { useFormContext, Validate } from "react-hook-form";
import * as Styled from "./FormControl.styled";
import { ErrorMessage } from "@hookform/error-message";

interface FormControlProps {
  label: string;
  name: string;
  type: Extract<HTMLInputTypeAttribute, "text" | "password">;
  autoComplete?: "off" | "new-password";
  required?: boolean;
  placeholder?: string;
  requiredMessage?: string;
  validate?: Validate<any> | Record<string, Validate<any>> | undefined;
}

const FormControl = ({
  label,
  name,
  type,
  autoComplete,
  required = false,
  requiredMessage = "Required",
  placeholder,
  validate,
}: FormControlProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  console.log("check errors", errors);

  return (
    <Styled.FormControl>
      <Styled.FormControlLabel>
        <Styled.FormControlLabelBox>
          <Styled.FormControlLabelText>{label}</Styled.FormControlLabelText>

          <Styled.FormControlLabelRequiredError
            className={errors[name] ? "error" : "required"}
          >
            <ErrorMessage errors={errors} name={name} />
          </Styled.FormControlLabelRequiredError>
        </Styled.FormControlLabelBox>
        <Styled.FormControlLabelInput
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          {...register(name, {
            required: required && requiredMessage,
            minLength: {
              value: 3,
              message: "Length must be 3 or more",
            },
            validate,
          })}
        />
      </Styled.FormControlLabel>
    </Styled.FormControl>
  );
};

export default FormControl;
