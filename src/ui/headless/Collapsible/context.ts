import { createScopedContext } from '@ui/utils';

type CollapsibleContextValue = {
  open: boolean;
  onOpenChange(open: boolean): void;
};

const [CollapsibleContext, useCollapsibleContext] = createScopedContext<
  CollapsibleContextValue | undefined
>('Collapsible', undefined);

export { CollapsibleContext, useCollapsibleContext };
