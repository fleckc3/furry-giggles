import { ReactNode } from "react";
import { FormProvider as Form, UseFormReturn, FormProviderProps } from "react-hook-form";

type Props = {
  children: ReactNode;
  methods: UseFormReturn<any>;
  onSubmit: VoidFunction;
};

type ProviderProps = Props & FormProviderProps;

export default function FormProvider({
  children,
  onSubmit,
  methods,
}: ProviderProps) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} noValidate>
        {children}
      </form>
    </Form>
  );
}
