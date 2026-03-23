import { Native, type NativeProps } from '@ui/headless';
import { cn } from '@ui/utils';

type BaseProps = NativeProps<'div'>;
type FieldContentProps = BaseProps & {
  direction?: 'horizontal' | 'vertical';
};

export const FieldContent = ({
  direction,
  className,
  ...props
}: FieldContentProps) => (
  <Native.div
    data-direction={direction}
    {...props}
    className={cn(
      'group/field-content',
      'flex',
      'flex-col',
      'gap-x-3',
      'gap-y-1',
      'grow',
      'data-[direction=horizontal]:flex-row',
      className
    )}
  />
);

FieldContent.displayName = 'FieldContent';
