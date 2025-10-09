import {
  type ReactNode,
  type HTMLAttributes,
  useRef,
  useState,
  useEffect,
} from 'react';
import { ChevronRight, Dot } from 'lucide-react';
import { Collapsible } from '../Collapsible';
import classes from './treeClasses';
import { useTreeContext } from './treeContext';

export type TreeItemProps = {
  index: string;
  name: ReactNode;
  items?: TreeItemProps[];
  onItemOver?(item: HTMLElement): void;
} & HTMLAttributes<HTMLElement>;

export const TreeItem = (inProps: TreeItemProps) => {
  const { index: indexProp, name, items = [], onItemOver, ...props } = inProps;

  const { state } = useTreeContext();
  const initOpen = state.get(indexProp) ?? true;

  const [open, setOpen] = useState(initOpen);
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

  useEffect(() => {
    state.set(indexProp, open);
  }, [indexProp, state, open]);

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
                index={`${indexProp}_${index}`}
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
