import {
  type ElementType,
  type HTMLAttributes,
  type RefAttributes,
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
} from 'react';
import { cn } from '../utils';
import { Interaction } from '../Interaction';
import { Highlight } from '../Highlight';
import { type TreeItemData, TreeItem } from './TreeItem';
import { TreeContext } from './treeContext';
import classes from './treeClasses';
import { useMergedRefs } from '../hooks';

export type TreeProps = {
  as?: ElementType;
  data?: TreeItemData[];
} & HTMLAttributes<HTMLElement> &
  RefAttributes<HTMLElement>;

export const Tree = (inProps: TreeProps) => {
  const {
    as: Tag = 'div',
    ref: refProp,
    data = [],
    className,
    ...props
  } = inProps;

  const [state, setState] = useState<Record<string, boolean>>({});
  const [over, setOver] = useState(false);

  const ref = useRef<HTMLElement>(null);
  const highlightRef = useRef<HTMLElement>(null);
  const prevOverRef = useRef(over);

  const mergedRefs = useMergedRefs(refProp, ref);

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

  useEffect(() => {
    const node = ref.current;
    if (node) {
      function handleClick() {
        if (!prevOverRef.current) {
          setOver(true);
        }
      }

      node.addEventListener('click', handleClick);
      return () => node.removeEventListener('click', handleClick);
    }
  }, []);

  useLayoutEffect(() => {
    const node = ref.current;
    if (node) {
      const canUseHover = window.matchMedia('(hover: hover)').matches;
      if (!canUseHover) {
        const timeoutId = setTimeout(() => {
          if (over) {
            setOver(false);
          }
        }, 200);

        return () => clearTimeout(timeoutId);
      }
    }

    prevOverRef.current = over;
  }, [over]);

  return (
    <Tag ref={mergedRefs} className={cn(classes.root, className)} {...props}>
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
