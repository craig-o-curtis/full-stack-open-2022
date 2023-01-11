import React from 'react';
import { useForm, FormProvider, FormState } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import FormStateWatcher from 'components/common/FormStateWatcher';

interface FormProps {
  onSubmit: (values: any) => void;
  onChange?: (formState: FormState<any>) => void;
  debug?: boolean;
  resetOnSuccess?: boolean;
  children: React.ReactNode;
}

const Form = ({
  onSubmit,
  debug = false,
  onChange,
  resetOnSuccess,
  children,
}: FormProps) => {
  const methods = useForm({
    mode: 'onChange',
    shouldFocusError: true,
    delayError: 400,
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
        {children}
      </form>
      {debug && process.env.NODE_ENV === 'development' && (
        <DevTool control={methods.control} />
      )}
      {/* // TODO create hook if work */}
      <FormStateWatcher onChange={onChange} resetOnSuccess={resetOnSuccess} />
    </FormProvider>
  );
};

export default Form;
