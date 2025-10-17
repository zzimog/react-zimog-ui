import {
  type ElementType,
  type HTMLAttributes,
  type RefAttributes,
  useRef,
  useCallback,
} from 'react';
import { getRelativeRect, rectEquals } from '../utils';
import { useMergedRefs } from '../hooks';
import { InteractionNode } from './InteractionNode';
import { InteractionContext } from './interactionContext';

export type InteractionType = 'click' | 'focus' | 'hover';

export type InteractionProps = {
  as?: ElementType;
  type?: InteractionType;
  defaultSelected?: number;
  onNodeChange?: (node: HTMLElement) => void;
  onRectChange?: (rect: DOMRect) => void;
} & HTMLAttributes<HTMLElement> &
  RefAttributes<HTMLElement>;

export const Interaction = (inProps: InteractionProps) => {
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
        let rafId = requestAnimationFrame(function loop() {
          const current = currentRef.current;

          if (node && current) {
            const rootRect = node!.getBoundingClientRect();
            const currentRect = current!.getBoundingClientRect();
            const rect = getRelativeRect(rootRect, currentRect);

            if (
              prevRectRef.current === null ||
              !rectEquals(rect, prevRectRef.current)
            ) {
              onRectChange?.(rect);
              prevRectRef.current = rect;
            }
          }

          rafId = requestAnimationFrame(loop);
        });

        function handleOut() {
          currentRef.current = null;
          prevRectRef.current = null;
        }

        if (type === 'hover') {
          node.addEventListener('mouseleave', handleOut);
        }

        return () => {
          cancelAnimationFrame(rafId);

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
      <InteractionContext value={context}>{children}</InteractionContext>
    </Tag>
  );
};

Interaction.Node = InteractionNode;
