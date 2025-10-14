import { type ElementType, type HTMLAttributes, useRef, useState } from 'react';
import { cn } from '../utils';
import { Interaction } from '../Interaction';
import { Highlight } from '../Highlight';
import { type TreeItemData, TreeItem } from './TreeItem';
import { TreeContext } from './treeContext';
import classes from './treeClasses';

export type TreeProps = {
  as?: ElementType;
  data?: TreeItemData[];
} & HTMLAttributes<HTMLElement>;

export const Tree = (inProps: TreeProps) => {
  const { as: Tag = 'div', data = [], className, ...props } = inProps;

  const [state, setState] = useState<Record<string, boolean>>({});

  const [over, setOver] = useState(false);
  const highlightRef = useRef<HTMLElement>(null);

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
    <Tag
      {...props}
      data-component="Tree"
      className={cn(className, classes.root)}
    >
      {data.length > 0 && (
        <>
          <Highlight
            ref={highlightRef}
            visible={over}
            className={classes.highlight}
          />
          <Interaction type="hover" onRectChange={handleRectChange}>
            <ul className={classes.list.root}>
              <TreeContext value={context}>
                {data.map((item, index) => (
                  <TreeItem
                    key={index}
                    index={`${index}`}
                    name={item.name}
                    items={item.items}
                    onMouseOver={() => setOver(true)}
                    onMouseLeave={() => setOver(false)}
                  />
                ))}
              </TreeContext>
            </ul>
          </Interaction>
        </>
      )}
    </Tag>
  );
};
