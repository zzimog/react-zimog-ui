import { type PolyProps, composeHandlers, Poly, useMergedRefs } from '@ui';
import { useHighlightContext } from './highlightContext';
import { useCallback, useEffect, useRef } from 'react';

const DISPLAY_NAME = 'HighlightItem';

type HighlightItemProps = PolyProps<'div'> & {
  selected?: boolean;
};

export const HighlightItem = (inProps: HighlightItemProps) => {
  const { ref: refProp, selected, onClick, ...props } = inProps;

  const context = useHighlightContext(DISPLAY_NAME);

  const ref = useRef<HTMLElement>(null);
  const mergedRef = useMergedRefs(refProp, ref);

  const handleSelect = useCallback(() => {
    const root = context.rootRef.current;
    const node = ref.current;
    if (root && node) {
      const rootRect = root.getBoundingClientRect();
      const nodeRect = node.getBoundingClientRect();

      const rect = new DOMRect(
        nodeRect.x - rootRect.x,
        nodeRect.y - rootRect.y,
        nodeRect.width,
        nodeRect.height
      );

      context.onRectChange(rect);
    }
  }, []);

  useEffect(() => {
    if (selected) {
      handleSelect();
    }
  }, [selected]);

  return (
    <Poly.div
      ref={mergedRef}
      onClick={composeHandlers(onClick, handleSelect)}
      {...props}
    />
  );
};

HighlightItem.displayName = DISPLAY_NAME;
