import type { ElementType, HTMLAttributes } from 'react';
import { cn } from '../utils';
import boxClasses from './boxClasses';

export type BoxProps = {
  as?: ElementType;
} & HTMLAttributes<HTMLElement>;

export const Box = (inProps: BoxProps) => {
  const { as, className, ...props } = inProps;

  const Comp = as || 'div';

  return <Comp className={cn(boxClasses, className)} {...props} />;
};
