import {
  type ElementType,
  type HTMLAttributes,
  type RefAttributes,
  useState,
  useRef,
  useEffect,
} from 'react';
import { cn } from '../utils';
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

  /*
  const [highlight, setHighlight] = useState(false);
  const highlightRef = useRef<HTMLElement>(null);
  const leaveFrameRef = useRef(0);
  */

  const context = {
    treeState: state,
    setTreeState(index: string, open: boolean) {
      setState((prev) => ({
        ...prev,
        [index]: open,
      }));
    },
  };

  /*
  function handleRectChange(rect?: DOMRect) {
    const node = highlightRef.current;
    if (node && rect) {
      const { x, y, width, height } = rect;

      node.style.setProperty('--x', `${x}px`);
      node.style.setProperty('--y', `${y}px`);
      node.style.setProperty('--width', `${width}px`);
      node.style.setProperty('--height', `${height}px`);

      setHighlight(true);
    }
  }

  function handleItemOver() {
    cancelAnimationFrame(leaveFrameRef.current);
  }

  function handleItemLeave() {
    cancelAnimationFrame(leaveFrameRef.current);
    leaveFrameRef.current = requestAnimationFrame(() => {
      setHighlight(false);
    });
  }

  useEffect(() => {
    return () => cancelAnimationFrame(leaveFrameRef.current);
  }, []);
  */

  return (
    <Highlight
      as={Tag}
      type="hover"
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
};
