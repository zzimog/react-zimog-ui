import { type ReactNode, useContext } from 'react';
import { type PolyProps, Poly } from '../polymorphic';
import { cn } from '../utils';
import { Spinner } from '../Spinner';
import { ButtonGroup } from './ButtonGroup';
import ButtonGroupContext from './buttonGroupContext';
import classes from './buttonClasses';

export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonVariant = 'solid' | 'outlined' | 'dashed' | 'ghost';

export type ButtonColor = 'default' | 'primary' | 'secondary' | 'danger';

export type ButtonProps = PolyProps<typeof Poly.button> & {
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

  const mergedSize = context?.size || size;
  const mergedVariant = variant || context?.variant;
  const mergedColor = color || context?.color;
  const mergedDisabled = loading || disabled || context?.disabled || false;

  const isJoined = context?.joined;
  const joinDirection = context?.column ? 'col' : 'row';

  return (
    <Poly.button
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
    </Poly.button>
  );
};

Button.Group = ButtonGroup;
