import { useState, type PropsWithChildren } from 'react';
import { Popper } from '@ui/headless';
import { createScopedContext } from '@ui/utils';
import { Menu } from './Menu';

const DISPLAY_NAME = 'MenuSub';

type MenuSubContextValue = {
  open: boolean;
  onOpenChange(open: boolean): void;
  onOpenToggle(): void;
};

const [MenuSubContext, useMenuSubContext] = createScopedContext<
  MenuSubContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type MenuSubProps = PropsWithChildren<{
  defaultOpen?: boolean;
}>;

export const MenuSub = (inProps: MenuSubProps) => {
  const { defaultOpen, children } = inProps;

  const [open, setOpen] = useState(defaultOpen ?? false);

  Menu.useContext(DISPLAY_NAME);

  return (
    <MenuSubContext
      open={open}
      onOpenChange={setOpen}
      onOpenToggle={() => setOpen(!open)}
    >
      <Popper>{children}</Popper>
    </MenuSubContext>
  );
};

MenuSub.displayName = DISPLAY_NAME;
MenuSub.useContext = useMenuSubContext;
