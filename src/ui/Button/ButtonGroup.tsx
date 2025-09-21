import { Children, type HTMLAttributes } from 'react';
import { cn } from '../utils';
import type { ButtonColor, ButtonSize, ButtonVariant } from './Button';
import ButtonGroupContext from './buttonGroupContext';

export type ButtonGroupProps = {
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ButtonColor;
  disabled?: boolean;
  direction?: 'row' | 'col';
  joined?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const ButtonGroup = (inProps: ButtonGroupProps) => {
  const {
    direction = 'row',
    joined = false,
    size,
    variant,
    color,
    disabled,
    children,
    className,
    ...props
  } = inProps;

  const childrenCount = Children.count(children);

  function getPosClassName(pos: number) {
    const isRow = direction === 'row';
    const isFirst = pos === 0;
    const isLast = pos === childrenCount - 1;

    if (isFirst) {
      return isRow ? 'rounded-r-none' : 'rounded-b-none';
    } else if (isLast) {
      return isRow ? 'rounded-l-none' : 'rounded-t-none';
    } else {
      return 'rounded-none';
    }
  }

  return (
    <div
      role="group"
      className={cn(
        'inline-flex',
        'items-center',
        joined ? 'gap-[1px]' : 'gap-1',
        direction === 'col' && 'flex-col',
        className
      )}
      {...props}
    >
      {Children.map(children, (child, index) => (
        <ButtonGroupContext
          value={{
            size,
            variant,
            color,
            disabled,
            className: cn('w-full', joined && getPosClassName(index)),
          }}
        >
          {child}
        </ButtonGroupContext>
      ))}
    </div>
  );
};
