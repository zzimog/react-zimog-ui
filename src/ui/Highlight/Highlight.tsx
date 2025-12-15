import { useEffect, useRef } from 'react';
import { useMergedRefs } from '../hooks';
import { Poly, type PolyProps } from '../polymorphic';
import { cn } from '../utils';
import { HighlightIndicator } from './HighlightIndicator';
import { HighlightItem } from './HighlightItem';
import classes from './highlightClasses';
import { HighlightContext } from './highlightContext';

type HighlightProps = PolyProps<'div'> & {
  type?: 'click' | 'focus' | 'hover';
  leaveMode?: 'parent' | 'items';
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

  const currentRef = useRef<HTMLElement>(null);

  const ref = useRef<HTMLElement>(null);
  const mergedRefs = useMergedRefs(refProp, ref);

  useEffect(() => {
    const node = ref.current;
    if (node && type === 'hover' && leaveMode === 'parent') {
      function handleDisable() {
        if (!persistent) {
          currentRef.current = null;
        }
      }

      node.addEventListener('mouseleave', handleDisable);
      return () => node.removeEventListener('mouseleave', handleDisable);
    }
  }, [type, leaveMode, persistent]);

  return (
    <Poly.div
      ref={mergedRefs}
      className={cn(classes.root, className)}
      {...props}
    >
      <HighlightContext
        type={type}
        leaveMode={leaveMode}
        persistent={persistent}
        rootRef={ref}
        currentRef={currentRef}
        onCurrentChange={(element) => {
          currentRef.current = element;
        }}
      >
        {children}
      </HighlightContext>
    </Poly.div>
  );
};

Highlight.displayName = 'Highlight';
Highlight.Item = HighlightItem;
Highlight.Indicator = HighlightIndicator;
