import { useId, useState, type PropsWithChildren } from 'react';
import { useControllableState } from '@ui/hooks';
import { createScopedContext } from '@ui/utils';
import { PopoverContent } from './PopoverContent';
import { PopoverTrigger } from './PopoverTrigger';

const DISPLAY_NAME = 'Popover';

type PopoverContextType = {
  contentId: string;
  open: boolean;
  trigger: HTMLElement | null;
  onOpenChange(open: boolean): void;
  onTriggerChange(node: HTMLElement): void;
};

const [PopoverContext, usePopoverContext] = createScopedContext<
  PopoverContextType | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type PopoverProps = PropsWithChildren<{
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}>;

export const Popover = (inProps: PopoverProps) => {
  const {
    defaultOpen = false,
    open: openProp,
    children,
    onOpenChange,
  } = inProps;

  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen,
    prop: openProp,
    onChange: onOpenChange,
  });

  const [trigger, setTrigger] = useState<HTMLElement | null>(null);

  const contentId = useId();

  return (
    <PopoverContext
      contentId={contentId}
      open={open}
      trigger={trigger}
      onOpenChange={setOpen}
      onTriggerChange={setTrigger}
    >
      {children}
    </PopoverContext>
  );
};

Popover.displayName = DISPLAY_NAME;
Popover.useContext = usePopoverContext;
Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;
