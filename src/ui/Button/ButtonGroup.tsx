import { type PolyProps, Poly } from '../polymorphic';
import { cn } from '../utils';
import type { ButtonColor, ButtonSize, ButtonVariant } from './Button';
import ButtonGroupContext from './buttonGroupContext';
import classes from './buttonClasses';

export type ButtonGroupProps = PolyProps<typeof Poly.div> & {
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
    <Poly.div role="group" className={cn(classNames, className)} {...props}>
      <ButtonGroupContext value={context}>{children}</ButtonGroupContext>
    </Poly.div>
  );
};
