import { type Dispatch, type SetStateAction } from 'react';
import { createScopedContext } from '../utils';

type SetState = Dispatch<SetStateAction<HTMLElement>>;

type ScrollAreaContextValue = {
  viewport?: HTMLElement;
  setViewport: SetState;
};

const [ScrollAreaContext, useScrollAreaContext] = createScopedContext<
  ScrollAreaContextValue | undefined
>('ScrollArea', undefined);

export { ScrollAreaContext, useScrollAreaContext };
