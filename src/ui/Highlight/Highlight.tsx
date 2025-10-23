import { useRef, useEffect, useCallback } from 'react';
import { poly } from '../polymorphic';
import { useMergedRefs } from '../hooks';
import { cn } from '../utils';
import { HighlightIndicator } from './HighlightIndicator';
import { HighlightItem } from './HighlightItem';
import { HighlightContext } from './highlightContext';
import classes from './highlightClasses';

type HighlightType = 'click' | 'focus' | 'hover';

type HighlightLeaveMode = 'parent' | 'items';

type HighlightProps = {
  type?: HighlightType;
  leaveMode?: HighlightLeaveMode;
  persistent?: boolean;
};

const HighlightRoot = poly.div<HighlightProps>((Tag, inProps) => {
  const {
    ref: refProp,
    type = 'click',
    leaveMode = 'parent',
    persistent = false,
    className,
    children,
    ...props
  } = inProps;

  const ref = useRef<HTMLElement>(null);
  const mergedRefs = useMergedRefs(refProp, ref);

  const currentRef = useRef<HTMLElement>(null);

  const context = {
    type,
    leaveMode,
    persistent,
    rootRef: ref,
    currentRef,
  };

  const handleDisable = useCallback(() => {
    if (!persistent) {
      currentRef.current = null;
    }
  }, [persistent]);

  useEffect(() => {
    const node = ref.current;
    if (node && type === 'hover' && leaveMode === 'parent') {
      node.addEventListener('mouseleave', handleDisable);
      return () => node.removeEventListener('mouseleave', handleDisable);
    }
  }, [type, leaveMode]);

  return (
    <Tag ref={mergedRefs} className={cn(classes.root, className)} {...props}>
      <HighlightContext value={context}>{children}</HighlightContext>
    </Tag>
  );
});

export const Highlight = Object.assign(HighlightRoot, {
  Item: HighlightItem,
  Indicator: HighlightIndicator,
});

export type { HighlightType, HighlightLeaveMode, HighlightProps };
