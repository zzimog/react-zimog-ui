import {
  type ElementType,
  type HTMLAttributes,
  type Ref,
  useCallback,
  useState,
} from 'react';
import { cn } from '../utils';
import { mergeRefs } from 'react-merge-refs';

export type CollapsibleProps = {
  ref?: Ref<HTMLElement>;
  as?: ElementType;
  open?: boolean;
  animate?: boolean;
} & HTMLAttributes<HTMLElement>;

export const Collapsible = (inProps: CollapsibleProps) => {
  const {
    as,
    ref,
    open: initialOpen,
    //animate = true,
    className,
    children,
    ...props
  } = inProps;

  const Tag = as || 'div';

  const [height, setHeight] = useState<number | null>(null);
  const [open, setOpen] = useState(initialOpen);
  //const [hidden, setHidden] = useState(false);

  const heightRef = useCallback((node: HTMLElement) => {
    if (node) {
      setHeight(() => {
        const { height } = node.getBoundingClientRect();

        node.style.setProperty('--height', `${height}px`);
        return height;
      });
    }
  }, []);

  const mergedRefs = mergeRefs([heightRef, ref]);

  const isVisible = height && open;

  return (
    <Tag
      ref={mergedRefs}
      className={cn(
        className,
        'overflow-hidden',
        isVisible ? 'h-[var(--height)]' : 'h-0'
      )}
      hidden={false}
      {...props}
    >
      {children}
    </Tag>
  );
};
