import { type HTMLAttributes, type ReactNode, useState } from 'react';
import { ChevronRight, Dot } from 'lucide-react';
import { Interaction } from '../Interaction';
import { Collapsible } from '../Collapsible';
import classes from './treeClasses';
import { useTreeContext } from './treeContext';

export type TreeItemData = {
  name: string;
  items?: TreeItemData[];
};

export type TreeItemProps = {
  index: string;
  name: ReactNode;
  items?: TreeItemData[];
} & HTMLAttributes<HTMLElement>;

export const TreeItem = (inProps: TreeItemProps) => {
  const {
    index: indexProp,
    name,
    items = [],
    onMouseOver,
    onMouseLeave,
  } = inProps;

  const { treeState, setTreeState } = useTreeContext();
  const initOpen = treeState[indexProp] ?? true;

  const [open, setOpen] = useState(initOpen);

  const isParent = items.length > 0;

  function handleClick() {
    if (isParent) {
      setTreeState(indexProp, !open);
      setOpen(!open);
    }
  }

  return (
    <li data-index={indexProp} data-parent={isParent}>
      <Interaction.Node>
        <div
          data-state={isParent ? (open ? 'open' : 'closed') : undefined}
          className={classes.list.item}
          onClick={handleClick}
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
        >
          {isParent ? <ChevronRight /> : <Dot />}
          {name}
        </div>
      </Interaction.Node>

      {isParent && (
        <Collapsible open={open}>
          <ul className={classes.list.root}>
            {items.map((item, index) => (
              <TreeItem
                key={`${indexProp}-${index}`}
                index={`${indexProp}-${index}`}
                name={item.name}
                items={item.items}
                onMouseOver={onMouseOver}
                onMouseLeave={onMouseLeave}
              />
            ))}
          </ul>
        </Collapsible>
      )}
    </li>
  );
};
