import { useRef, useCallback } from 'react';
import { HighlightContext } from './highlightContext';
import { HighlightHighlighter } from './HighlightHighlighter';
import { HighlightItem } from './HighlightItem';

/**
 * @todo Refactor
 */
import { poly } from '../../ui/polymorphic';
import { useAnimationFrameLoop } from '../motion';
import { useMergedRefs } from '../../ui/hooks';
import { getRelativeRect } from '../../ui/utils';

export type HighlightType = 'click' | 'focus' | 'hover';

export type HighlightProps = {
  type?: HighlightType;
};

export const Highlight = poly.div<HighlightProps>((Tag, inProps) => {
  const { ref: refProp, type = 'click', children, ...props } = inProps;

  const rootRef = useRef<HTMLElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLElement>(null);

  const ref = useCallback(
    (node: HTMLElement) => {
      if (type === 'hover') {
        function handleOut() {
          currentRef.current = null;
        }

        node.addEventListener('mouseleave', handleOut);
        return () => node.removeEventListener('mouseleave', handleOut);
      }
    },
    [type]
  );

  const mergedRefs = useMergedRefs(refProp, rootRef, ref);

  const context = {
    type,
    root: rootRef,
    current: currentRef,
    setCurrent(node: HTMLElement) {
      currentRef.current = node;
    },
  };

  useAnimationFrameLoop(() => {
    const root = rootRef.current;
    const highlight = highlightRef.current;
    const current = currentRef.current;

    if (root && highlight) {
      if (current) {
        const rootRect = root!.getBoundingClientRect();
        const currentRect = current!.getBoundingClientRect();

        const rect = getRelativeRect(rootRect, currentRect);

        Object.assign(highlight.style, {
          width: `${rect.width}px`,
          height: `${rect.height}px`,
          transform: `translate(${rect.x}px, ${rect.y}px)`,
        });
      }

      highlight.hidden = current === undefined;
    }
  });

  return (
    <Tag
      ref={mergedRefs}
      className="relative w-200 flex flex-col gap-4 border p-4"
      {...props}
    >
      <div
        ref={highlightRef}
        className="absolute z-0 bg-red-500 transition-all duration-300"
      />
      <div className="relative z-1">
        <HighlightContext value={context}>{children}</HighlightContext>
      </div>
    </Tag>
  );
});

Highlight.Highlighter = HighlightHighlighter;
Highlight.Item = HighlightItem;
