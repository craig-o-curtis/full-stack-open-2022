import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

interface FormProps {
  onSubmit: any;
  debug?: boolean;
  children: React.ReactNode;
}

const Form = ({ onSubmit, debug = false, children }: FormProps) => {
  const methods = useForm({ mode: "onChange" });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
        {children}
      </form>
      {debug && process.env.NODE_ENV === "development" && (
        <DevTool control={methods.control} />
      )}
    </FormProvider>
  );
};

export default Form;
