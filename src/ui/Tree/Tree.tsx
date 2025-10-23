import { useState } from 'react';
import { poly } from '../polymorphic';
import { cn } from '../utils';
import { Highlight } from '../Highlight';
import { type TreeItemData, TreeItem } from './TreeItem';
import { TreeContext } from './treeContext';
import classes from './treeClasses';

type TreeProps = {
  data?: TreeItemData[];
};

const TreeRoot = poly.div<TreeProps>((Tag, inProps) => {
  const { data = [], className, ...props } = inProps;

  const [state, setState] = useState<Record<string, boolean>>({});

  const context = {
    treeState: state,
    setTreeState(index: string, open: boolean) {
      setState((prev) => ({
        ...prev,
        [index]: open,
      }));
    },
  };

  return (
    <Highlight
      as={Tag}
      type="hover"
      leaveMode="items"
      className={cn(classes.root, className)}
      {...props}
    >
      <Highlight.Indicator className={classes.highlight} />
      <ul className={classes.list.root}>
        <TreeContext value={context}>
          {data.map((item, index) => (
            <TreeItem
              key={index}
              index={`${index}`}
              name={item.name}
              items={item.items}
            />
          ))}
        </TreeContext>
      </ul>
    </Highlight>
  );
});

export const Tree = Object.assign(TreeRoot, {
  Item: TreeItem,
});

export type { TreeProps };
