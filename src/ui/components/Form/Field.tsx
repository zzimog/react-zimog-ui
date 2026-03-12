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
        'gap-x-3',
        'gap-y-1',
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
      'group-has-disabled/field:opacity-50',
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
  <Native.p
    {...props}
    className={cn(
      'text-sm',
      'text-muted',
      '[&_a]:text-foreground',
      '[&_a]:underline',
      className
    )}
  />
);

FieldDescription.displayName = 'FieldDescription';
Field.Description = FieldDescription;

/*---------------------------------------------------------------------------*/
