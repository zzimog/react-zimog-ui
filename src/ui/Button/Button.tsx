import {
  type ButtonHTMLAttributes,
  type PropsWithChildren,
  type ReactNode,
  type Ref,
  useContext,
} from 'react';
import { cn } from '../utils';
import { Spinner } from '../Spinner';
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
  icon?: ReactNode;
  ref?: Ref<HTMLButtonElement>;
}> &
  ButtonHTMLAttributes<HTMLButtonElement>;

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
    ref,
    ...props
  } = inProps;

  const context = useContext(ButtonGroupContext);

  const mergedVariant = variant || context?.variant;

  const mergedColor = color || context?.color;

  const mergedSize = context?.size || size;

  const mergedDisabled = loading || disabled || context?.disabled || false;

  return (
    <button
      ref={ref}
      className={cn(
        buttonClasses({
          variant: mergedVariant,
          color: mergedColor,
          size: mergedSize,
          loading,
        }),
        context?.className,
        className
      )}
      disabled={mergedDisabled}
      {...props}
    >
      {loading ? <Spinner /> : icon}
      {children}
    </button>
  );
};
