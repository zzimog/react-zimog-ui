import type { ElementType, HTMLAttributes } from 'react';
import { cn } from '../utils';
import classes from './tabsClasses';

export type TabsListProps = {
  as?: ElementType;
} & HTMLAttributes<HTMLElement>;

export const TabsList = (inProps: TabsListProps) => {
  const { as: Tag = 'div', className, ...props } = inProps;

  return (
    <Tag role="tabslist" className={cn(classes.header, className)} {...props} />
  );
};
