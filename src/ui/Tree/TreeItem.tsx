import { type HTMLAttributes, type MouseEvent, type ReactNode } from 'react';
import { ChevronRight, Dot } from 'lucide-react';
import { Highlight } from '../Highlight';
import { Collapsible } from '../Collapsible_old';
import { useTreeContext } from './treeContext';
import classes from './treeClasses';

export type TreeItemData = {
  name: string;
  items?: TreeItemData[];
};

export type TreeItemProps = {
  index: string;
  name: ReactNode;
  items?: TreeItemData[];
} & HTMLAttributes<HTMLElement>;

function getState(parent: boolean, open?: boolean) {
  return parent ? (open ? 'open' : 'closed') : undefined;
}

export const TreeItem = (inProps: TreeItemProps) => {
  const { index: indexProp, name, items = [], onClick, ...itemProps } = inProps;

  const { treeState, setTreeState } = useTreeContext();

  const parent = items.length > 0;
  const open = parent && (treeState[indexProp] ?? true);

  function handleClick(event: MouseEvent<HTMLElement>) {
    onClick?.(event);

    if (parent) {
      setTreeState(indexProp, !open);
    }
  }

  return (
    <li data-index={indexProp} data-parent={parent}>
      <Highlight.Item
        data-state={getState(parent, open)}
        className={classes.list.item}
        onClick={handleClick}
        {...itemProps}
      >
        {parent ? <ChevronRight /> : <Dot />}
        {name}
      </Highlight.Item>

      {parent && (
        <Collapsible open={open}>
          <ul className={classes.list.root}>
            {items.map((item, index) => (
              <TreeItem
                key={`${indexProp}-${index}`}
                index={`${indexProp}-${index}`}
                name={item.name}
                items={item.items}
                onClick={onClick}
                {...itemProps}
              />
            ))}
          </ul>
        </Collapsible>
      )}
    </li>
  );
};
