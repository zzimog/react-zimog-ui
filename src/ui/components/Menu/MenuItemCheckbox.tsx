import type { ComponentPropsWithRef } from 'react';
import { Check } from 'lucide-react';
import { Checkable } from '@ui/headless';
import { Menu } from './Menu';
import { MenuItem } from './MenuItem';

const DISPLAY_NAME = 'MenuItemCheckbox';

type BaseProps = ComponentPropsWithRef<typeof Checkable>;
type MenuItemCheckboxProps = BaseProps;

export const MenuItemCheckbox = (inProps: MenuItemCheckboxProps) => {
  const { children, ...props } = inProps;

  Menu.useContext(DISPLAY_NAME);

  return (
    <MenuItem role="menuitemcheckbox" asChild>
      <Checkable {...props}>
        {children}
        <Checkable.Indicator asChild>
          <Check />
        </Checkable.Indicator>
      </Checkable>
    </MenuItem>
  );
};

MenuItemCheckbox.displayName = DISPLAY_NAME;
