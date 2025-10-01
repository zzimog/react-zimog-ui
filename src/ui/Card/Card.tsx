import type { ElementType, HTMLAttributes, Ref } from 'react';
import { cn } from '../utils';
import cardClasses from './cardClasses';

export type CardProps = {
  as?: ElementType;
  ref?: Ref<HTMLElement>;
  opticalCorrection?: 'top' | 'both' | 'none';
} & HTMLAttributes<HTMLElement>;

export const Card = (inProps: CardProps) => {
  const {
    as: Tag = 'div',
    opticalCorrection = 'none',
    className,
    ...props
  } = inProps;

  const classes = cardClasses({ opticalCorrection });

  return <Tag className={cn(classes, className)} {...props} />;
};
