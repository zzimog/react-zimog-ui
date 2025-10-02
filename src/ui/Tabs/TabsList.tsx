import {
  type ElementType,
  type HTMLAttributes,
  useRef,
  useState,
  useLayoutEffect,
} from 'react';
import { cn } from '../utils';
import classes from './tabsClasses';
import { TabsListContext } from './tabsListContext';

export type TabsListProps = {
  as?: ElementType;
} & HTMLAttributes<HTMLElement>;

export const TabsList = (inProps: TabsListProps) => {
  const { as: Tag = 'div', className, children, ...props } = inProps;

  const rootRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState<HTMLElement>();

  useLayoutEffect(() => {
    const root = rootRef.current;
    const indicator = indicatorRef.current;
    if (!root || !indicator || !active) return;

    const { left: rootLeft } = root.getBoundingClientRect();
    const { width, left: nodeLeft } = active.getBoundingClientRect();
    const left = nodeLeft - rootLeft;

    Object.assign(indicator.style, {
      width: `${width}px`,
      transform: `translateX(${left}px)`,
    });
  }, [active]);

  return (
    <Tag
      ref={rootRef}
      role="tabslist"
      className={cn(classes.list.root, className)}
      {...props}
    >
      <div className={classes.list.tabs}>
        <TabsListContext value={{ setActive }}>{children}</TabsListContext>
      </div>
      {active && <div ref={indicatorRef} className={classes.list.indicator} />}
    </Tag>
  );
};
