import { type ElementType, type HTMLAttributes, useRef } from 'react';
import { cn } from '../utils';
import classes from './tabsClasses';
import { Interaction } from '../Interaction';
import { Highlight } from '../Highlight';

export type TabsListProps = {
  as?: ElementType;
} & HTMLAttributes<HTMLElement>;

export const TabsList = (inProps: TabsListProps) => {
  const { as: Tag = 'div', className, children, ...props } = inProps;

  const highlightRef = useRef<HTMLDivElement>(null);

  function handleRectChange(rect?: DOMRect) {
    const node = highlightRef.current;
    if (node && rect) {
      const { x, y, width, height } = rect;

      Object.assign(node.style, {
        width: `${width}px`,
        height: `${height}px`,
        transform: `translate(${x}px, ${y}px)`,
      });
    }
  }

  return (
    <Tag
      role="tabslist"
      className={cn(classes.list.root, className)}
      {...props}
    >
      <Highlight ref={highlightRef} persistent />
      <Interaction defaultSelected={0} onRectChange={handleRectChange}>
        <div className={classes.list.tabs}>{children}</div>
      </Interaction>
    </Tag>
  );
};
