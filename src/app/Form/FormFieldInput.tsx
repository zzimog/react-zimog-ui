import type { ComponentPropsWithRef } from 'react';
import { Input } from '@ui/components';
import { FormField } from './FormField';

const DISPLAY_NAME = 'FormFieldInput';

type FormFieldInputProps = ComponentPropsWithRef<typeof Input>;

export const FormFieldInput = (inProps: FormFieldInputProps) => {
  const { ...props } = inProps;

  const { baseId, descriptionId } = FormField.useContext(DISPLAY_NAME);

  return <Input id={baseId} aria-describedby={descriptionId} {...props} />;
};

FormFieldInput.displayName = DISPLAY_NAME;
