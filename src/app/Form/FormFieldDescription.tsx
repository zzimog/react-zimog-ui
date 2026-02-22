import { useId, useLayoutEffect } from 'react';
import { cn, Native, type NativeProps } from '@ui';
import { FormField } from './FormField';
import classes from './classes';

const DISPLAY_NAME = 'FormFieldDescription';

type FormFieldDescriptionProps = NativeProps<'p'>;

export const FormFieldDescription = (inProps: FormFieldDescriptionProps) => {
  const { className, ...props } = inProps;

  const id = useId();
  const { onDescriptionIdChange } = FormField.useContext(DISPLAY_NAME);

  useLayoutEffect(() => {
    onDescriptionIdChange(id);
    return () => onDescriptionIdChange(undefined);
  }, [id]);

  return (
    <Native.p
      id={id}
      {...props}
      className={cn(classes.description, className)}
    />
  );
};

FormFieldDescription.displayName = DISPLAY_NAME;
