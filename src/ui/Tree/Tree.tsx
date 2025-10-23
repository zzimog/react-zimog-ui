import {
  type ElementType,
  type HTMLAttributes,
  type RefAttributes,
  useState,
} from 'react';
import { cn } from '../utils';
import { Highlight, HighlightIndicator } from '../Highlight';
import { type TreeItemData, TreeItem } from './TreeItem';
import { TreeContext } from './treeContext';
import classes from './treeClasses';

export type TreeProps = {
  as?: ElementType;
  data?: TreeItemData[];
} & HTMLAttributes<HTMLElement> &
  RefAttributes<HTMLElement>;

export const Tree = (inProps: TreeProps) => {
  const { as: Tag = 'div', data = [], className, ...props } = inProps;

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
      className={cn(classes.root, className)}
      {...props}
    >
      <HighlightIndicator className={classes.highlight} />
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
