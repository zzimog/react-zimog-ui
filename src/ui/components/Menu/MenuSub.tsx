import { useCallback, useId, useState, type PropsWithChildren } from 'react';
import { Popper } from '@ui/headless';
import { createScopedContext } from '@ui/utils';
import { Menu } from './Menu';

const DISPLAY_NAME = 'MenuSub';

type MenuSubContextValue = {
  triggerId: string;
  contentId: string;
  onOpenToggle(): void;
};

const [MenuSubContext, useMenuSubContext] = createScopedContext<
  MenuSubContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type MenuSubProps = PropsWithChildren;

export const MenuSub = (inProps: MenuSubProps) => {
  const [open, setOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setOpen((open) => !open);
  }, [setOpen]);

  return (
    <Menu.Provider open={open} onOpenChange={setOpen}>
      <MenuSubContext
        triggerId={useId()}
        contentId={useId()}
        onOpenToggle={handleToggle}
      >
        <Popper>{inProps.children}</Popper>
      </MenuSubContext>
    </Menu.Provider>
  );
};

MenuSub.displayName = DISPLAY_NAME;
MenuSub.useContext = useMenuSubContext;
