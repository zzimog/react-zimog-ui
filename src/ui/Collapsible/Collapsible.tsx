import {
  type ElementType,
  type HTMLAttributes,
  type Ref,
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import { cn } from '../utils';

export type CollapsibleProps = {
  ref?: Ref<HTMLElement>;
  as?: ElementType;
  open?: boolean;
  animate?: boolean;
} & HTMLAttributes<HTMLElement>;

export const Collapsible = (inProps: CollapsibleProps) => {
  const { ref, as, open = false, animate = true, children, ...props } = inProps;

  const Tag = as || 'div';

  const [height, setHeight] = useState(-1);
  const [hidden, setHidden] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const isHidden = height > 0 && !open;

  useEffect(() => {
    setHidden(!open);
  }, [open]);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;

    if (wrapper && height < 0) {
      const { height } = wrapper.getBoundingClientRect();

      wrapper.style.setProperty('--height', `${height}px`);
      setHidden(true);
      setHeight(height);
    }
  }, [height]);

  return (
    <Tag ref={ref} {...props}>
      <div
        ref={wrapperRef}
        className={cn(
          'h-[var(--height)]',
          'overflow-hidden',
          isHidden && 'h-0',
          animate && 'transition-[height] duration-200'
        )}
      >
        {children}
      </div>
    </Tag>
  );
};
