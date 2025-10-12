import {
  type ReactElement,
  type RefAttributes,
  useRef,
  useLayoutEffect,
  Children,
  cloneElement,
} from 'react';
import { getRelativeRect, rectEquals, useMergedRefs } from '@ui';
import { InteractionContext } from './interactionContext';
import { InteractionNode } from './InteractionNode';

export type InteractionType = 'click' | 'focus' | 'hover';

export type InteractionProps = {
  type?: InteractionType;
  defaultSelected?: number;
  children: ReactElement;
  onNodeChange?: (node: HTMLElement) => void;
  onRectChange?: (rect: DOMRect) => void;
};

export const Interaction = (inProps: InteractionProps) => {
  const {
    type = 'click',
    defaultSelected,
    children,
    onNodeChange,
    onRectChange,
  } = inProps;

  const ref = useRef<HTMLElement>(null);
  const nodesRef = useRef(new Set<HTMLElement>());

  const nodeRef = useRef<HTMLElement>(null);
  const prevRectRef = useRef<DOMRect>(null);

  const context = {
    type,
    nodes: nodesRef.current,
    setNode: (node: HTMLElement) => {
      nodeRef.current = node;
      onNodeChange?.(node);
    },
  };

  useLayoutEffect(() => {
    const node = nodeRef.current;
    if (!node && typeof defaultSelected === 'number') {
      nodeRef.current = [...nodesRef.current][defaultSelected];
    }
  }, [defaultSelected]);

  useLayoutEffect(() => {
    let rafId: number;

    function loop() {
      const root = ref.current;
      const node = nodeRef.current;

      if (root && node) {
        const rootRect = root!.getBoundingClientRect();
        const nodeRect = node!.getBoundingClientRect();
        const rect = getRelativeRect(rootRect, nodeRect);

        if (
          prevRectRef.current === null ||
          !rectEquals(rect, prevRectRef.current)
        ) {
          onRectChange?.(rect);
          prevRectRef.current = rect;
        }
      }

      rafId = requestAnimationFrame(loop);
    }

    loop();
    return () => cancelAnimationFrame(rafId);
  }, [onRectChange]);

  const child = Children.only(children) as ReactElement<RefAttributes<unknown>>;
  const mergedRefs = useMergedRefs(child.props.ref, ref);

  return (
    <InteractionContext value={context}>
      {cloneElement(child, { ref: mergedRefs })}
    </InteractionContext>
  );
};

Interaction.displayName = 'Interaction';
Interaction.Node = InteractionNode;
