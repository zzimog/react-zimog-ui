import { useEffect, useRef } from 'react';
import { useMergedRefs } from '../hooks';
import { Native, type NativeProps } from '../Native';
import { cn } from '../utils';
import { HighlightIndicator } from './HighlightIndicator';
import { HighlightItem } from './HighlightItem';
import classes from './highlightClasses';
import { HighlightContext } from './highlightContext';

type HighlightProps = NativeProps<'div'> & {
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
    <Native.div
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
    </Native.div>
  );
};

Highlight.displayName = 'Highlight';
Highlight.Item = HighlightItem;
Highlight.Indicator = HighlightIndicator;
