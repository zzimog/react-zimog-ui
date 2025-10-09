import { type ElementType, type HTMLAttributes, useRef } from 'react';
import { cn } from '../utils';
import classes from './tabsClasses';
import { NodeGroup } from '../NodeGroup';

export type TabsListProps = {
  as?: ElementType;
} & HTMLAttributes<HTMLElement>;

export const TabsList = (inProps: TabsListProps) => {
  const { as: Tag = 'div', className, children, ...props } = inProps;

  const rootRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  function handleNodeChange(node?: HTMLElement) {
    const root = rootRef.current;
    const indicator = indicatorRef.current;

    if (!root || !indicator || !node) {
      return;
    }

    const { left: rootLeft } = rootRef.current!.getBoundingClientRect();
    const { width, left: nodeLeft } = node.getBoundingClientRect();
    const left = nodeLeft - rootLeft;

    Object.assign(indicator.style, {
      width: `${width}px`,
      transform: `translateX(${left}px)`,
    });
  }

  return (
    <Tag
      role="tabslist"
      className={cn(classes.list.root, className)}
      {...props}
    >
      <div ref={rootRef} className={classes.list.tabs}>
        <NodeGroup defaultSelected={0} onNodeChange={handleNodeChange}>
          {children}
        </NodeGroup>
      </div>
      <div ref={indicatorRef} className={classes.list.indicator} />
    </Tag>
  );
};
