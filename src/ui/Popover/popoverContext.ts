import type { RefObject } from 'react';
import { createScopedContext } from '../utils';

type PopoverContextType = {
  updateMode: 'always' | 'optimized';
  triggerRef: RefObject<HTMLElement | null>;
  contentId: string;
  open: boolean;
  onOpenChange(open: boolean): void;
};

const [PopoverContext, usePopoverContext] = createScopedContext<
  PopoverContextType | undefined
>('Popover', undefined);

export { PopoverContext, usePopoverContext };
