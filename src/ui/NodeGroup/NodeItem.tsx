import {
  type ReactElement,
  type RefAttributes,
  Children,
  useCallback,
  cloneElement,
} from 'react';
import { useMergedRefs } from '../hooks';
import { useNodeGroupContext } from './nodeGroupContext';

type ElementWithRef = ReactElement<RefAttributes<unknown>>;

export type NodeItemProps = {
  selected?: boolean;
  children: ElementWithRef;
};

export const NodeItem = (inProps: NodeItemProps) => {
  const { selected, children } = inProps;

  const { type, nodes, setNode } = useNodeGroupContext();

  const ref = useCallback(
    (node: HTMLElement) => {
      const eventType = type === 'hover' ? 'mouseover' : type;
      const handler = () => setNode(node);

      nodes.push(node);

      if (selected) {
        setNode(node);
      }

      node.addEventListener(eventType, handler);
      return () => node.removeEventListener(eventType, handler);
    },
    [selected, type, nodes, setNode]
  );

  const child = Children.only(children);
  const mergedRefs = useMergedRefs(child.props.ref, ref);

  return cloneElement(child, {
    ref: mergedRefs,
  });
};
