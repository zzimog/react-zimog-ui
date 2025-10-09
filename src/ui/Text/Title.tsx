import type { Ref, HTMLAttributes, ElementType } from 'react';
import { cn } from '../utils';
import titleClasses from './titleClasses';

export type TitleProps = {
  ref?: Ref<HTMLHeadingElement>;
  children: string;
  size?: 1 | 2 | 3 | 4 | 5 | 6;
} & HTMLAttributes<HTMLHeadingElement>;

export const Title = (inProps: TitleProps) => {
  const { size = 1, children, className, ref, ...props } = inProps;

  const Hx = `h${size}` as ElementType;

  return (
    <Hx
      ref={ref}
      className={cn('font-bold', titleClasses({ size }), className)}
      {...props}
    >
      {children}
    </Hx>
  );
};
