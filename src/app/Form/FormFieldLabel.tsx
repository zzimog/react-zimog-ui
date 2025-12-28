import { cn, Native, type NativeProps } from '@ui';
import { FormField } from './FormField';
import classes from './classes';

const DISPLAY_NAME = 'FormFieldLabel';

type FormFieldLabelProps = NativeProps<'label'>;

export const FormFieldLabel = (inProps: FormFieldLabelProps) => {
  const { className, ...props } = inProps;

  const { baseId } = FormField.useContext(DISPLAY_NAME);

  return (
    <Native.label
      htmlFor={baseId}
      {...props}
      className={cn(classes.label, className)}
    />
  );
};

FormFieldLabel.displayName = DISPLAY_NAME;
