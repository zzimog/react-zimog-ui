import { type ReactNode, type HTMLAttributes, useRef, useState } from 'react';
import classes from './treeClasses';
import { File } from 'lucide-react';
import { Presence } from '../Presence';

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

  const [open, setOpen] = useState(true);

  function handleOver() {
    const node = ref.current;
    if (!node) return;

    onItemOver?.(node);
  }

  return (
    <li {...props}>
      <div
        ref={ref}
        className={classes.list.item}
        onClick={() => setOpen(!open)}
        onMouseOver={handleOver}
      >
        <File />
        {name}
      </div>

      {items.length > 0 && (
        <Presence as="ul" className={classes.list.root} open={open}>
          {items.map((item, index) => (
            <TreeItem
              key={`${indexProp}_${index}`}
              index={index}
              name={item.name}
              items={item.items}
              onItemOver={onItemOver}
            />
          ))}
        </Presence>
      )}
    </li>
  );
};
