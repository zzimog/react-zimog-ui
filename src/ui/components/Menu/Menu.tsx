import type { ComponentPropsWithRef } from 'react';
import { createCollection, createScopedContext } from '@ui/utils';
import { MenuCheckboxItem } from './MenuCheckboxItem';
import { MenuContent } from './MenuContent';
import { MenuItem } from './MenuItem';
import { MenuLabel } from './MenuLabel';
import { MenuRadioGroup } from './MenuRadioGroup';
import { MenuRadioItem } from './MenuRadioItem';

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

type BaseProps = ComponentPropsWithRef<typeof MenuContent>;
type MenuProps = BaseProps & {
  open?: boolean;
};

export const Menu = (inProps: MenuProps) => {
  const { open, ...props } = inProps;
  const isOpen = !!open;

  return (
    <MenuContext open={isOpen}>
      <MenuCollection>
        <MenuContent {...props} />
      </MenuCollection>
    </MenuContext>
  );
};

Menu.displayName = DISPLAY_NAME;
Menu.useContext = useMenuContext;
Menu.useCollection = useMenuCollection;
Menu.Item = MenuItem;
Menu.Label = MenuLabel;
Menu.CheckboxItem = MenuCheckboxItem;
Menu.RadioGroup = MenuRadioGroup;
Menu.RadioItem = MenuRadioItem;
