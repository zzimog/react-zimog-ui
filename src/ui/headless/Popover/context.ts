import { createScopedContext } from '@ui/utils';

type PopoverContextType = {
  contentId: string;
  trigger: HTMLElement | null;
  open: boolean;
  setTrigger(node: HTMLElement): void;
  setOpen(open: boolean): void;
};

const [PopoverContext, usePopoverContext] = createScopedContext<
  PopoverContextType | undefined
>('Popover', undefined);

export { PopoverContext, usePopoverContext };
