import { type ElementType, type HTMLAttributes } from 'react';
import { poly } from '../polymorphic';
import { cn } from '../utils';
import { Highlight, HighlightIndicator } from '../Highlight';
import classes from './tabsClasses';

export type TabsListProps = {
  as?: ElementType;
} & HTMLAttributes<HTMLElement>;

export const TabsList = poly.div<TabsListProps>((Tag, inProps) => {
  const { className, children, ...props } = inProps;

  return (
    <Highlight
      as={Tag}
      role="tabslist"
      className={cn(classes.list.root, className)}
      persistent
      {...props}
    >
      <HighlightIndicator />
      <div className={classes.list.tabs}>{children}</div>
    </Highlight>
  );
});
