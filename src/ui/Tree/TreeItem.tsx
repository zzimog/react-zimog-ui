import { type ReactNode, type HTMLAttributes, useRef } from 'react';
import classes from './treeClasses';

export type TreeItemProps = {
  index?: number;
  name: ReactNode;
  items?: TreeItemProps[];
  onItemOver?(item: HTMLElement): void;
} & HTMLAttributes<HTMLElement>;

export const TreeItem = (inProps: TreeItemProps) => {
  const {
    index: indexProp = 0,
    name,
    items = [],
    onItemOver,
    ...props
  } = inProps;

  const ref = useRef<HTMLDivElement>(null);

  function handleOver() {
    const node = ref.current;
    if (!node) return;

    onItemOver?.(node);
  }

  return (
    <li {...props}>
      <div ref={ref} className={classes.list.item} onMouseOver={handleOver}>
        {name}
      </div>

      {items.length > 0 && (
        <ul className={classes.list.root}>
          {items.map((item, index) => (
            <TreeItem
              key={`${indexProp}_${index}`}
              index={index}
              name={item.name}
              items={item.items}
              onItemOver={onItemOver}
            />
          ))}
        </ul>
      )}
    </li>
  );
};
