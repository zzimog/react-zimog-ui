import { useRef, useCallback, useState } from 'react';
import { poly } from '../polymorphic';
import { getRelativeRect, rectEquals } from '../utils';
import { useMergedRefs } from '../hooks';
import { HighlightIndicator } from './HighlightIndicator';
import { HighlightItem } from './HighlightItem';
import { HighlightContext } from './highlightContext';
import { animationLoop } from '../utils/animation-loop';

export type HighlightType = 'click' | 'focus' | 'hover';

export type HighlightProps = {
  type?: HighlightType;
  persistent?: boolean;

  onRectChange?: (rect: DOMRect) => void;
};

export const Highlight = poly.div<HighlightProps>((Tag, inProps) => {
  const {
    ref: refProp,
    type = 'click',
    persistent = false,
    children,

    onRectChange,
    ...props
  } = inProps;

  const initialEnabled = type === 'click';
  const [enabled, setEnabled] = useState(initialEnabled);

  const currentRef = useRef<HTMLElement>(null);
  const prevRectRef = useRef<DOMRect>(null);

  const __ref = useCallback(
    (node: HTMLElement) => {
      if (onRectChange) {
        const cancelAnimation = animationLoop(() => {
          const current = currentRef.current;

          if (node && current) {
            const rootRect = node!.getBoundingClientRect();
            const currentRect = current!.getBoundingClientRect();

            const rect = getRelativeRect(rootRect, currentRect);
            const styles = getComputedStyle(current);

            const isVisible =
              styles?.display !== 'none' &&
              styles?.opacity !== '0' &&
              styles?.visibility !== 'hidden';

            if (!isVisible) {
              currentRef.current = null;
              prevRectRef.current = null;
            } else if (
              prevRectRef.current === null ||
              !rectEquals(rect, prevRectRef.current)
            ) {
              onRectChange?.(rect);
              prevRectRef.current = rect;
            }
          }
        });

        function handleOut() {
          currentRef.current = null;
          prevRectRef.current = null;
        }

        if (type === 'hover') {
          node.addEventListener('mouseleave', handleOut);
        }
        return () => {
          cancelAnimation();
          if (type === 'hover') {
            node.removeEventListener('mouseleave', handleOut);
          }
        };
      }
    },
    [onRectChange]
  );

  const ref = useRef<HTMLElement>(null);
  const mergedRefs = useMergedRefs(refProp, ref);

  const context = {
    type,
    persistent,
    rootRef: ref,
    currentRef,
    enabled,
    setEnabled,
  };

  return (
    <Tag ref={mergedRefs} {...props}>
      <HighlightContext value={context}>{children}</HighlightContext>
    </Tag>
  );
});

Highlight.Indicator = HighlightIndicator;
Highlight.Item = HighlightItem;
