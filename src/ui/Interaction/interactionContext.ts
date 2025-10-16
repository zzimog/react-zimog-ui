import { createContext } from 'react';
import type { InteractionType } from './Interaction';

type InteractionContextType = {
  type: InteractionType;
  setNode: (node: HTMLElement) => void;
};

export const InteractionContext = createContext<
  InteractionContextType | undefined
>(undefined);
