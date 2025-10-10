import {
  type ReactElement,
  type RefAttributes,
  useContext,
  useCallback,
  Children,
  cloneElement,
} from 'react';
import { useMergedRefs } from '@ui';
import { InteractionContext } from './interactionContext';

export type InteractionNodeProps = {
  defaultSelected?: boolean;
  children: ReactElement;
};

export const InteractionNode = (inProps: InteractionNodeProps) => {
  const { defaultSelected, children } = inProps;

  const context = useContext(InteractionContext);

  if (!context) {
    throw new Error(
      'InteractionNode must be used inside Interaction component.'
    );
  }

  const ref = useCallback(
    (node: HTMLElement) => {
      const { type, nodes, setNode } = context;
      const eventType = type === 'hover' ? 'mouseover' : type;
      const handler = () => setNode(node);

      if (defaultSelected) {
        setNode(node);
      }

      nodes.add(node);
      node.addEventListener(eventType, handler);

      return () => {
        nodes.delete(node);
        node.removeEventListener(eventType, handler);
      };
    },
    [defaultSelected, context]
  );

  const child = Children.only(children) as ReactElement<RefAttributes<unknown>>;
  const mergedRefs = useMergedRefs(child.props.ref, ref);

  return cloneElement(child, { ref: mergedRefs });
};

InteractionNode.displayName = 'Interaction Node';
