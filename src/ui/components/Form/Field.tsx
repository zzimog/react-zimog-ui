import { Native, type NativeProps } from '@ui/headless';
import { cn } from '@ui/utils';

type BaseProps = NativeProps<'div'>;
interface FieldProps extends BaseProps {
  direction?: 'horizontal' | 'vertical';
}

export const Field = (inProps: FieldProps) => {
  const { direction = 'vertical', className, ...props } = inProps;

  return (
    <Native.div
      data-direction={direction}
      {...props}
      className={cn(
        'group/field',
        'flex',
        'flex-col',
        'gap-3',
        'has-disabled:opacity-75',
        'has-disabled:cursor-not-allowed',
        'data-[direction=horizontal]:flex-row',
        className
      )}
    />
  );
};

Field.displayName = 'Form';

/*---------------------------------------------------------------------------*/

const FieldContent = ({ className, ...props }: NativeProps<'div'>) => (
  <Native.div
    {...props}
    className={cn('grow', 'flex', 'flex-col', 'gap-1', className)}
  />
);

FieldContent.displayName = 'FieldContent';
Field.Content = FieldContent;

/*---------------------------------------------------------------------------*/

const FieldLabel = ({ className, ...props }: NativeProps<'label'>) => (
  <Native.label
    {...props}
    className={cn(
      'text-sm/6',
      'font-semibold',
      'group-has-disabled/field:text-muted',
      'group-has-disabled/field:cursor-not-allowed',
      'group-has-aria-invalid/field:text-danger',
      className
    )}
  />
);

FieldLabel.displayName = 'FieldLabel';
Field.Label = FieldLabel;

/*---------------------------------------------------------------------------*/

const FieldDescription = ({ className, ...props }: NativeProps<'p'>) => (
  <Native.p {...props} className={cn('text-muted text-sm', className)} />
);

FieldDescription.displayName = 'FieldDescription';
Field.Description = FieldDescription;

/*---------------------------------------------------------------------------*/
