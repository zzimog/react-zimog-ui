import { type NativeProps, Native } from '../Native';
import { cn } from '../utils';
import type { ButtonColor, ButtonSize, ButtonVariant } from './Button';
import classes from './buttonClasses';
import { ButtonGroupContext } from './buttonGroupContext';

type ButtonGroupProps = NativeProps<'div'> & {
  column?: boolean;
  joined?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ButtonColor;
  disabled?: boolean;
};

export const ButtonGroup = (inProps: ButtonGroupProps) => {
  const {
    column = false,
    joined = false,
    size,
    variant,
    color,
    disabled,
    className,
    children,
    ...props
  } = inProps;

  const context = {
    column,
    joined,
    size,
    variant,
    color,
    disabled,
  };

  const classNames = classes.group({ column, joined });

  return (
    <Native.div role="group" className={cn(classNames, className)} {...props}>
      <ButtonGroupContext value={context}>{children}</ButtonGroupContext>
    </Native.div>
  );
};

ButtonGroup.displayName = 'ButtonGroup';
