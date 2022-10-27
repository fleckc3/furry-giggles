import { ReactNode } from 'react';
import { FormProvider as Form, UseFormReturn } from 'react-hook-form';

type FormProviderProps = {
  children: ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
};

export default function FormProvider({
  children,
  onSubmit,
  methods,
}: FormProviderProps) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} noValidate>
        {children}
      </form>
    </Form>
  );
}
