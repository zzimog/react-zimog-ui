import { type ElementType, type HTMLAttributes, useRef } from 'react';
import { cn } from '../utils';
import classes from './tabsClasses';
import { Interaction } from '../Interaction';

export type TabsListProps = {
  as?: ElementType;
} & HTMLAttributes<HTMLElement>;

export const TabsList = (inProps: TabsListProps) => {
  const { as: Tag = 'div', className, children, ...props } = inProps;

  const indicatorRef = useRef<HTMLDivElement>(null);

  function handleRectChange(rect: DOMRect) {
    const indicator = indicatorRef.current;

    if (indicator) {
      const { width, left } = rect;

      Object.assign(indicator.style, {
        width: `${width}px`,
        transform: `translateX(${left}px)`,
      });
    }
  }

  return (
    <Tag
      role="tabslist"
      className={cn(classes.list.root, className)}
      {...props}
    >
      <Interaction defaultSelected={0} onRectChange={handleRectChange}>
        <div className={classes.list.tabs}>{children}</div>
      </Interaction>
      <div ref={indicatorRef} className={classes.list.indicator} />
    </Tag>
  );
};
