import { useRef, useEffect, useCallback } from 'react';
import { type PolyProps, Poly } from '../polymorphic';
import { useMergedRefs } from '../hooks';
import { cn } from '../utils';
import { HighlightIndicator } from './HighlightIndicator';
import { HighlightItem } from './HighlightItem';
import { HighlightContext } from './highlightContext';
import classes from './highlightClasses';

export type HighlightType = 'click' | 'focus' | 'hover';

export type HighlightLeaveMode = 'parent' | 'items';

export type HighlightProps = PolyProps<typeof Poly.div> & {
  type?: HighlightType;
  leaveMode?: HighlightLeaveMode;
  persistent?: boolean;
};

export const Highlight = (inProps: HighlightProps) => {
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
    <Poly.div
      ref={mergedRefs}
      className={cn(classes.root, className)}
      {...props}
    >
      <HighlightContext value={context}>{children}</HighlightContext>
    </Poly.div>
  );
};

Highlight.Item = HighlightItem;
Highlight.Indicator = HighlightIndicator;
