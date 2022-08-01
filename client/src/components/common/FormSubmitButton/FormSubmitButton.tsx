import React from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "../";

interface FormSubmitButtonProps {
  children: React.ReactNode;
}

const FormSubmitButton = ({ children }: FormSubmitButtonProps) => {
  const { formState } = useFormContext();

  return (
    <Button type="submit" disabled={!formState.isValid}>
      {children ? children : "Submit"}
    </Button>
  );
};

export default FormSubmitButton;
