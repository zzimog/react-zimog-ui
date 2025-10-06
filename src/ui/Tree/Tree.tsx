import {
  type ElementType,
  type RefAttributes,
  type HTMLAttributes,
  useRef,
} from 'react';
import { mergeRefs } from 'react-merge-refs';
import { cn } from '../utils';
import classes from './treeClasses';
import { type TreeItemProps, TreeItem } from './TreeItem';

export type TreeProps = {
  as?: ElementType;
  data?: TreeItemProps[];
} & RefAttributes<HTMLElement> &
  HTMLAttributes<HTMLElement>;

export const Tree = (inProps: TreeProps) => {
  const {
    as: Tag = 'div',
    ref: refProp,
    data = [],
    className,
    ...props
  } = inProps;

  const ref = useRef<HTMLElement>(null);
  const mergedRef = mergeRefs([refProp, ref]);

  const highlightRef = useRef<HTMLDivElement>(null);

  function handleOver(item: HTMLElement) {
    const parentRect = ref.current!.getBoundingClientRect();
    const { top, left, width, height } = item.getBoundingClientRect();
    const leftOffset = left - parentRect.left;
    const topOffset = top - parentRect.top;

    const highlight = highlightRef.current!;

    Object.assign(highlight.style, {
      width: `${width}px`,
      height: `${height}px`,
      transform: `translate(${leftOffset}px, ${topOffset}px)`,
      opacity: 1,
    });
  }

  return (
    <Tag ref={mergedRef} className={cn(classes.root, className)} {...props}>
      {data.length > 0 && (
        <>
          <div ref={highlightRef} className={classes.highlight} />
          <ul className={classes.list.root}>
            {data.map((item, index) => (
              <TreeItem
                key={index}
                index={index}
                name={item.name}
                items={item.items}
                onItemOver={handleOver}
              />
            ))}
          </ul>
        </>
      )}
    </Tag>
  );
};
