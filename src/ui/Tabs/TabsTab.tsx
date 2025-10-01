import type { ElementType, HTMLAttributes } from 'react';
import { cn } from '../utils';
import classes from './tabsClasses';
import { useTabs } from './tabsContext';

export type TabsTab = {
  as?: ElementType;
  index?: number;
} & HTMLAttributes<HTMLElement>;

export const TabsTab = (inProps: TabsTab) => {
  const { as: Tag = 'div', className, ...props } = inProps;

  const { baseId, index, setValue } = useTabs();

  const id = `${baseId}_${index}`;

  return (
    <Tag
      id={id}
      tabIndex={index}
      className={cn(classes.tab, className)}
      {...props}
    />
  );
};
