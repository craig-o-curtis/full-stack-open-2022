import React from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "../";

interface FormSubmitButtonProps {
  disabled?: boolean;
  children: React.ReactNode;
}

const FormSubmitButton = ({ disabled, children }: FormSubmitButtonProps) => {
  const { formState } = useFormContext();

  return (
    <Button type="submit" disabled={!formState.isValid || disabled}>
      {children ? children : "Submit"}
    </Button>
  );
};

export default FormSubmitButton;
