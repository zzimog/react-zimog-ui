import { type ComponentPropsWithRef, type FormEvent, useRef } from 'react';
import { FormField } from './FormField';
import { FormContext } from './formContext';
import { composeHandlers } from '../utils';

export type FormData = {
  [key: string]: any;
};

type FormProps = ComponentPropsWithRef<'form'> & {
  defaultData?: FormData;
  onFormSubmit?: (data: FormData) => void;
};

export const Form = (inProps: FormProps) => {
  const {
    defaultData = {},
    children,
    onSubmit,
    onFormSubmit,
    ...props
  } = inProps;

  const dataRef = useRef<FormData>({});

  const handleSubmit = composeHandlers(onSubmit, (evt: FormEvent) => {
    evt.preventDefault();
    onFormSubmit?.(dataRef.current);
  });

  const context = {
    defaultData,
    onValueChange(name: string, value: any) {
      dataRef.current[name] = value;
    },
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit} {...props}>
      <FormContext value={context}>{children}</FormContext>
    </form>
  );
};

Form.displayName = 'Form';
Form.Field = FormField;
