import React, { HTMLInputTypeAttribute } from 'react';
import { Validate, useFormContext } from 'react-hook-form';

import { ErrorMessage } from '@hookform/error-message';

import * as Styled from './FormControl.styled';

interface FormControlProps {
  label: string;
  name: string;
  type: Extract<HTMLInputTypeAttribute, 'text' | 'password' | 'url'>;
  autoComplete?: 'off' | 'new-password';
  required?: boolean;
  minLength?: number;
  placeholder?: string;
  requiredMessage?: string;
  validate?: Validate<any> | Record<string, Validate<any>> | undefined;
}

const FormControl = ({
  label,
  name,
  type,
  autoComplete = 'off',
  required = false,
  requiredMessage = 'Required',
  minLength,
  placeholder,
  validate,
}: FormControlProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Styled.FormControl data-testid={`control-${name}`}>
      <Styled.FormControlLabel>
        <Styled.FormControlLabelBox>
          <Styled.FormControlLabelText>{label}</Styled.FormControlLabelText>

          <Styled.FormControlLabelRequiredError
            className={
              (errors?.[name]?.type || ('' as string)) === 'required'
                ? 'required'
                : 'error'
            }
          >
            <ErrorMessage errors={errors} name={name} />
          </Styled.FormControlLabelRequiredError>
        </Styled.FormControlLabelBox>
        <Styled.FormControlLabelInput
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          {...register(name, {
            ...(required &&
              requiredMessage && {
                ...{ required: required && requiredMessage },
              }),
            ...(minLength && {
              minLength: {
                value: minLength,
                message: 'Length must be 3 or more',
              },
            }),
            validate,
          })}
        />
      </Styled.FormControlLabel>
    </Styled.FormControl>
  );
};

export default FormControl;
