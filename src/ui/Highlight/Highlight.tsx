import { useRef, useEffect, useCallback } from 'react';
import { poly } from '../polymorphic';
import { useMergedRefs } from '../hooks';
import { cn } from '../utils';
import { HighlightIndicator } from './HighlightIndicator';
import { HighlightItem } from './HighlightItem';
import { HighlightContext } from './highlightContext';
import classes from './highlightClasses';

export type HighlightType = 'click' | 'focus' | 'hover';

export type HighlightProps = {
  type?: HighlightType;
  persistent?: boolean;
};

export const Highlight = poly.div<HighlightProps>((Tag, inProps) => {
  const {
    ref: refProp,
    type = 'click',
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
    if (node && type === 'hover') {
      node.addEventListener('mouseleave', handleDisable);
      return () => node.removeEventListener('mouseleave', handleDisable);
    }
  }, []);

  return (
    <Tag ref={mergedRefs} className={cn(classes.root, className)} {...props}>
      <HighlightContext value={context}>{children}</HighlightContext>
    </Tag>
  );
});

Highlight.Indicator = HighlightIndicator;
Highlight.Item = HighlightItem;
