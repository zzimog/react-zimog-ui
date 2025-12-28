import { useId, useState } from 'react';
import { Native, type NativeProps } from '@ui/headless';
import { cn, createScopedContext } from '@ui/utils';
import { FormFieldDescription } from './FormFieldDescription';
import { FormFieldInput } from './FormFieldInput';
import { FormFieldLabel } from './FormFieldLabel';
import classes from './classes';

const DISPLAY_NAME = 'FormField';

type FormFieldContextValue = {
  baseId: string;
  descriptionId: string | null;
  onDescriptionIdChange(id: string | null): void;
};

const [FormFieldContext, useFormFieldContext] = createScopedContext<
  FormFieldContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type FormFieldProps = NativeProps<'div'>;

export const FormField = (inProps: FormFieldProps) => {
  const { className, children, ...props } = inProps;

  const baseId = useId();
  const [descriptionId, setDescriptionId] = useState<string | null>(null);

  return (
    <Native.div {...props} className={cn(classes.root, className)}>
      <FormFieldContext
        baseId={baseId}
        descriptionId={descriptionId}
        onDescriptionIdChange={setDescriptionId}
      >
        {children}
      </FormFieldContext>
    </Native.div>
  );
};

FormField.displayName = DISPLAY_NAME;
FormField.Label = FormFieldLabel;
FormField.Description = FormFieldDescription;
FormField.Input = FormFieldInput;
FormField.useContext = useFormFieldContext;
