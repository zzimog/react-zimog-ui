import {
  type ElementType,
  type HTMLAttributes,
  type RefAttributes,
  useState,
  useRef,
  useEffect,
} from 'react';
import { cn } from '../utils';
import { Interaction } from '../Interaction';
import { Highlight } from '../Highlight';
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
  const [over, setOver] = useState(false);

  const highlightRef = useRef<HTMLElement>(null);
  const leaveTimeoutRef = useRef<number>(0);

  const context = {
    treeState: state,
    setTreeState(index: string, open: boolean) {
      setState((prev) => ({
        ...prev,
        [index]: open,
      }));
    },
  };

  function handleRectChange(rect?: DOMRect) {
    const node = highlightRef.current;
    if (node && rect) {
      const { width, height, y } = rect;

      Object.assign(node.style, {
        right: 0,
        width: `${width}px`,
        height: `${height}px`,
        transform: `translateY(${y}px)`,
      });
    }
  }

  function handleItemOver() {
    clearTimeout(leaveTimeoutRef.current);
    setOver(true);
  }

  function handleItemLeave() {
    clearTimeout(leaveTimeoutRef.current);
    leaveTimeoutRef.current = setTimeout(() => {
      setOver(false);
    }, 100);
  }

  useEffect(() => {
    return () => clearTimeout(leaveTimeoutRef.current);
  }, []);

  return (
    <Interaction
      as={Tag}
      type="hover"
      className={cn(classes.root, className)}
      onRectChange={handleRectChange}
      {...props}
    >
      <Highlight
        ref={highlightRef}
        visible={over}
        className={classes.highlight}
      />
      <ul className={classes.list.root}>
        <TreeContext value={context}>
          {data.map((item, index) => (
            <TreeItem
              key={index}
              index={`${index}`}
              name={item.name}
              items={item.items}
              onMouseOver={handleItemOver}
              onMouseLeave={handleItemLeave}
            />
          ))}
        </TreeContext>
      </ul>
    </Interaction>
  );
};
