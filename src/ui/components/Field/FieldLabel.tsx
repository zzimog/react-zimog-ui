import { Native, type NativeProps } from '@ui/headless';
import { cn } from '@ui/utils';
import { Field } from './Field';

const DISPLAY_NAME = 'FieldLabel';

type BaseProps = Omit<NativeProps<'label'>, 'id'>;
type FieldLabelProps = BaseProps;

export const FieldLabel = (inProps: FieldLabelProps) => {
  const { className, ...props } = inProps;

  const context = Field.useContext(DISPLAY_NAME);

  return (
    <Native.label
      htmlFor={context.id}
      {...props}
      className={cn(
        'w-fit',
        'text-sm/none',
        'font-semibold',
        'group-has-[>[disabled]]/field:text-muted',
        'group-has-[>[disabled]]/field:cursor-not-allowed',
        'group-has-aria-invalid/field:text-danger',
        'group-has-[[type=checkbox]]/field:leading-6',
        'group-has-[[role=checkbox]]/field:leading-6',
        className
      )}
    />
  );
};

FieldLabel.displayName = DISPLAY_NAME;
