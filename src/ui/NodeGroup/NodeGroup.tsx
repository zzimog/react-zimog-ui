import { type ReactNode, useRef, useMemo, useLayoutEffect } from 'react';
import { NodeGroupContext } from './nodeGroupContext';
import { NodeItem } from './NodeItem';

type NodeGroupProps = {
  type?: 'click' | 'focus' | 'hover';
  defaultSelected?: number;
  children: ReactNode;
  onNodeChange?: (node?: HTMLElement) => void;
};

export const NodeGroup = (inProps: NodeGroupProps) => {
  const { type = 'click', defaultSelected, children, onNodeChange } = inProps;

  const currentNodeRef = useRef<HTMLElement>(null);

  const context = useMemo(
    () => ({
      type,
      nodes: [],
      setNode: (node: HTMLElement) => {
        currentNodeRef.current = node;
        onNodeChange?.(node);
      },
    }),
    [type, onNodeChange]
  );

  useLayoutEffect(() => {
    const node = currentNodeRef.current;
    const { nodes } = context;

    if (!node && nodes.length > 0) {
      if (defaultSelected) {
        onNodeChange?.(nodes[defaultSelected]);
      }

      onNodeChange?.(undefined);
    }
  }, [defaultSelected, context, onNodeChange]);

  return <NodeGroupContext value={context}>{children}</NodeGroupContext>;
};

NodeGroup.Item = NodeItem;
