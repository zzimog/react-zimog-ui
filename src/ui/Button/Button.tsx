import {
  type ButtonHTMLAttributes,
  type PropsWithChildren,
  useContext,
} from 'react';
import { cn } from '../utils';
import buttonClasses from './buttonClasses';
import ButtonGroupContext from './buttonGroupContext';

export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonVariant = 'solid' | 'outlined' | 'dashed' | 'ghost';

export type ButtonColor = 'default' | 'primary' | 'secondary' | 'danger';

export type ButtonProps = PropsWithChildren<{
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ButtonColor;
  loading?: boolean;
}> &
  ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (inProps: ButtonProps) => {
  const {
    size,
    variant,
    color,
    loading,
    disabled,
    className,
    children,
    ...props
  } = inProps;

  const context = useContext(ButtonGroupContext);

  const mergedVariant = variant || context?.variant;

  const mergedColor = color || context?.color;

  const mergedSize = context?.size || size;

  const mergedDisabled = disabled || context?.disabled || false;

  return (
    <button
      disabled={mergedDisabled}
      className={cn(
        buttonClasses({
          variant: mergedVariant,
          color: mergedColor,
          size: mergedSize,
        }),
        context?.className,
        className
      )}
      {...props}
    >
      {loading ? (
        <div className="size-6 border-3 border-r-transparent rounded-full animate-spin" />
      ) : (
        children
      )}
    </button>
  );
};
