import { createContext, useContext } from 'react';

type NodeGroupContextType = {
  type: 'click' | 'focus' | 'hover';
  nodes: HTMLElement[];
  setNode(node: HTMLElement): void;
};

export const NodeGroupContext = createContext<NodeGroupContextType | undefined>(
  undefined
);

export function useNodeGroupContext() {
  const context = useContext(NodeGroupContext);

  if (!context) {
    throw new Error('useNodeGroupContext must be used inside NodeGroupContext');
  }

  return context;
}
