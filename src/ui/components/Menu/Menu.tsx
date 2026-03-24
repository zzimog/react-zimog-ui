import type { PropsWithChildren } from 'react';
import { createCollection, createScopedContext } from '@ui/utils';
import { MenuContent } from './MenuContent';
import { MenuItem } from './MenuItem';

const DISPLAY_NAME = 'Menu';

type MenuContextValue = {
  open: boolean;
};

const [MenuContext, useMenuContext] = createScopedContext<
  MenuContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type MenuCollectionData = {
  node: HTMLElement;
  disabled?: boolean;
};

const [MenuCollection, useMenuCollection] =
  createCollection<MenuCollectionData>(DISPLAY_NAME);

/*---------------------------------------------------------------------------*/

type MenuProps = PropsWithChildren<{
  open?: boolean;
}>;

export const Menu = (inProps: MenuProps) => {
  const { open, children } = inProps;
  const isOpen = !!open;

  return (
    <MenuContext open={isOpen}>
      <MenuCollection>
        <MenuContent>{children}</MenuContent>
      </MenuCollection>
    </MenuContext>
  );
};

Menu.displayName = DISPLAY_NAME;
Menu.useContext = useMenuContext;
Menu.useCollection = useMenuCollection;
Menu.Item = MenuItem;
