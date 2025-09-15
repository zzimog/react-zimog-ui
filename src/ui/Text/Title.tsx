import type { ElementType, HTMLAttributes } from 'react';
import { cn } from '../utils';
import headingClasses from './headingClasses';

export type TitleProps = {
  children: string;
  size?: 1 | 2 | 3 | 4 | 5 | 6;
} & HTMLAttributes<HTMLHeadingElement>;

export const Title = (inProps: TitleProps) => {
  const { size = 1, children, className, ...props } = inProps;

  const Hx = `h${size}` as ElementType;

  return (
    <Hx
      className={cn('font-bold', headingClasses({ size }), className)}
      {...props}
    >
      {children}
    </Hx>
  );
};
