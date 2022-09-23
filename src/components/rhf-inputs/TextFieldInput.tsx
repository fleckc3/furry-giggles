import {
  CircularProgress,
  InputAdornment,
  TextField,
  TextFieldProps,
  OutlinedTextFieldProps,
} from '@mui/material';
import { Controller, RegisterOptions } from 'react-hook-form';

type Props = {
  name: string;
  defaultValue?: string | number;
  helperText?: string;
  required?: boolean;
  isLoading?: boolean;
  rules?: RegisterOptions;
  variant?: string;
  size?: string;
};

export type TextFieldInputProps = Props &
  TextFieldProps &
  OutlinedTextFieldProps;

const MAX_LENGTH = 256;

function TextFieldInput({
  name,
  defaultValue,
  helperText,
  required,
  isLoading,
  rules,
  inputProps,
  ...props
}: TextFieldInputProps) {
  let inputRules = { ...rules };

  if (required) {
    inputRules.required = 'This field is required';
  }
  return (
    <Controller
      name={name}
      rules={inputRules}
      defaultValue={defaultValue || ''}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { error },
      }) => {
        return (
          <TextField
            fullWidth
            name={name}
            data-testid={name}
            disabled={isLoading}
            required={required}
            inputRef={ref}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            error={!!error}
            helperText={error?.message || helperText}
            inputProps={{
              maxLength: MAX_LENGTH,
              'data-testid': name + '-input',
              ...inputProps,
            }}
            InputProps={{
              endAdornment: isLoading ? (
                <InputAdornment position="start">
                  <CircularProgress size={20} />
                </InputAdornment>
              ) : null,
            }}
            {...props}
          />
        );
      }}
    />
  );
}

export default TextFieldInput;
