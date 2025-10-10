import {
  type ReactElement,
  type RefAttributes,
  useRef,
  useEffect,
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

  /**
   * @todo To be implemented
   */
  persistent?: boolean;
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
  const nodeRef = useRef<HTMLElement>(null);
  const nodesRef = useRef(new Set<HTMLElement>());

  const prevRectRef = useRef<DOMRect>(null);

  const context = {
    type,
    nodes: nodesRef.current,
    setNode(node: HTMLElement) {
      nodeRef.current = node;
      onNodeChange?.(node);
    },
  };

  useEffect(() => {
    const root = ref.current;
    const node = nodeRef.current;
    let rafId: number;

    if (!node && typeof defaultSelected === 'number') {
      nodeRef.current = [...nodesRef.current][defaultSelected];
    }

    if (root && node) {
      function loop() {
        const rootRect = ref.current!.getBoundingClientRect();
        const nodeRect = nodeRef.current!.getBoundingClientRect();

        const relativeRect = getRelativeRect(rootRect, nodeRect);

        if (
          prevRectRef.current === null ||
          !rectEquals(relativeRect, prevRectRef.current)
        ) {
          onRectChange?.(relativeRect);
          prevRectRef.current = relativeRect;
        }

        rafId = requestAnimationFrame(loop);
      }

      rafId = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(rafId);
    }
  }, [defaultSelected, onRectChange]);

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
