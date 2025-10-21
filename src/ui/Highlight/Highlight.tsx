import {
  type ElementType,
  type HTMLAttributes,
  type RefAttributes,
  useRef,
  useCallback,
} from 'react';
import { getRelativeRect, rectEquals } from '../utils';
import { useMergedRefs } from '../hooks';
import { HighlightIndicator } from './HighlightIndicator';
import { HighlightItem } from './HighlightItem';
import { HighlightContext } from './highlightContext';
import { animationLoop } from '../utils/animation-loop';

export type HighlightType = 'click' | 'focus' | 'hover';

export type HighlightProps = {
  as?: ElementType;
  type?: HighlightType;
  defaultSelected?: number;
  onNodeChange?: (node: HTMLElement) => void;
  onRectChange?: (rect: DOMRect) => void;
} & HTMLAttributes<HTMLElement> &
  RefAttributes<HTMLElement>;

export const Highlight = (inProps: HighlightProps) => {
  const {
    as: Tag = 'div',
    ref: refProp,
    type = 'click',
    children,
    onNodeChange,
    onRectChange,
    ...props
  } = inProps;

  const currentRef = useRef<HTMLElement>(null);
  const prevRectRef = useRef<DOMRect>(null);

  const ref = useCallback(
    (node: HTMLElement) => {
      if (onRectChange) {
        const stop = animationLoop(() => {
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
          stop();
          if (type === 'hover') {
            node.removeEventListener('mouseleave', handleOut);
          }
        };
      }
    },
    [onRectChange]
  );

  const mergedRefs = useMergedRefs(refProp, ref);

  const context = {
    type,
    setNode: (node: HTMLElement) => {
      currentRef.current = node;
      onNodeChange?.(node);
    },
  };

  return (
    <Tag ref={mergedRefs} {...props}>
      <HighlightContext value={context}>{children}</HighlightContext>
    </Tag>
  );
};

Highlight.Indicator = HighlightIndicator;
Highlight.Item = HighlightItem;
