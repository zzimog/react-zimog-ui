import { type ReactNode, type HTMLAttributes, useRef, useState } from 'react';
import { ChevronRight, Dot } from 'lucide-react';
import { Collapsible } from '../Collapsible';
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

  const [open, setOpen] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const isParent = items.length > 0;

  function handleOver() {
    onItemOver?.(ref.current!);
  }

  function handleClick() {
    if (isParent) {
      setOpen(!open);
    }
  }

  return (
    <li data-parent={isParent} {...props}>
      <div
        ref={ref}
        data-state={isParent ? (open ? 'open' : 'closed') : undefined}
        className={classes.list.item}
        onClick={handleClick}
        onMouseOver={handleOver}
      >
        {isParent ? <ChevronRight /> : <Dot />}
        {name}
      </div>

      {isParent && (
        <Collapsible open={open}>
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
        </Collapsible>
      )}
    </li>
  );
};
