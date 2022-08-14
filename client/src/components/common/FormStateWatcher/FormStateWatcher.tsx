import { useEffect } from "react";
import { FormState, useFormContext } from "react-hook-form";

// ** Component watches form state and notifies when successful submit
interface FormStateWatcherProps {
  onChange?: (formState: FormState<any>) => void;
  resetOnSuccess?: boolean;
}

const FormStateWatcher = ({
  onChange,
  resetOnSuccess,
}: FormStateWatcherProps) => {
  const { formState, reset } = useFormContext();
  // **

  useEffect(() => {
    onChange?.(formState);
  }, [formState, onChange]);

  useEffect(() => {
    if (resetOnSuccess && formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState.isSubmitSuccessful, reset, resetOnSuccess]);

  return null;
};

export default FormStateWatcher;
