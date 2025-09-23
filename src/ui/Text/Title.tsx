import type { ElementType, HTMLAttributes, Ref } from 'react';
import { cn } from '../utils';
import titleClasses from './titleClasses';

export type TitleProps = {
  children: string;
  size?: 1 | 2 | 3 | 4 | 5 | 6;
  ref?: Ref<HTMLHeadingElement>;
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
