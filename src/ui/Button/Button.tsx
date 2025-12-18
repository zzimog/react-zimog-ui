import { type ReactNode, useContext } from 'react';
import { type NativeProps, Native } from '../Native';
import { Spinner } from '../Spinner';
import { cn } from '../utils';
import classes from './buttonClasses';
import { ButtonGroup } from './ButtonGroup';
import { ButtonGroupContext } from './buttonGroupContext';

export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonVariant = 'solid' | 'outlined' | 'ghost';

export type ButtonColor = 'default' | 'primary' | 'danger';

type ButtonProps = NativeProps<'button'> & {
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ButtonColor;
  loading?: boolean;
  icon?: ReactNode;
};

export const Button = (inProps: ButtonProps) => {
  const {
    size,
    variant,
    color,
    loading,
    icon,
    disabled,
    className,
    children,
    ...props
  } = inProps;

  const context = useContext(ButtonGroupContext);

  const mergedSize = size || context?.size;
  const mergedVariant = variant || context?.variant;
  const mergedColor = color || context?.color;
  const mergedDisabled = loading || disabled || context?.disabled || false;

  const isJoined = context?.joined;
  const joinDirection = context?.column ? 'col' : 'row';

  return (
    <Native.button
      className={cn(
        classes.button({
          size: mergedSize,
          variant: mergedVariant,
          color: mergedColor,
          loading,
          joined: isJoined ? joinDirection : null,
        }),
        className
      )}
      disabled={mergedDisabled}
      {...props}
    >
      {loading ? <Spinner /> : icon}
      {children}
    </Native.button>
  );
};

Button.displayName = 'Button';
Button.Group = ButtonGroup;
