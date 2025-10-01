import { useId, type ElementType, type HTMLAttributes } from 'react';
import { cn } from '../utils';
import classes from './tabsClasses';

export type TabsItemProps = {
  as?: ElementType;
  value: string;
} & HTMLAttributes<HTMLElement>;

export const TabsItem = (inProps: TabsItemProps) => {
  const { as: Tag = 'div', id: propId, className, ...props } = inProps;

  const id = useId();

  return (
    <Tag
      id={propId || id}
      role="tabpanel"
      className={cn(classes.item, className)}
      {...props}
    />
  );
};
