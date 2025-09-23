import type { ElementType, HTMLAttributes, Ref } from 'react';
import { cn } from '../utils';
import boxClasses from './boxClasses';

export type BoxProps = {
  as?: ElementType;
  ref?: Ref<HTMLElement>;
} & HTMLAttributes<HTMLElement>;

export const Box = (inProps: BoxProps) => {
  const { as, className, ...props } = inProps;

  const Tag = as || 'div';

  return <Tag className={cn(boxClasses, className)} {...props} />;
};
