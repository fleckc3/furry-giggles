import TextFieldInput from './TextFieldInput';

type EmailInputProps = {
  rules?: {};
  name: string;
  rest?: any;
  required?: boolean;
  size?: 'small' | 'medium' | undefined;
};

function EmailInput({ rules, name, ...rest }: EmailInputProps) {
  const validationRules = {
    pattern: {
      value: /^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/i,
      message: 'Please use a valid email.',
    },
    ...rules,
  };
  return (
    <TextFieldInput
      name={name}
      type="email"
      label="Email"
      variant="outlined"
      autoComplete="email"
      rules={validationRules}
      {...rest}
    />
  );
}

export default EmailInput;
