import { useState } from 'react';
import { type PolyProps, Poly } from '../polymorphic';
import { cn } from '../utils';
import { Highlight } from '../Highlight';
import { type TreeItemData, TreeItem } from './TreeItem';
import { TreeContext } from './treeContext';
import classes from './treeClasses';

export type TreeProps = PolyProps<typeof Poly.div> & {
  data?: TreeItemData[];
};

export const Tree = (inProps: TreeProps) => {
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
      type="hover"
      leaveMode="items"
      className={cn(classes.root, className)}
      {...props}
    >
      <Highlight.Indicator bound="right" className={classes.highlight} />
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
};

Tree.Item = TreeItem;
