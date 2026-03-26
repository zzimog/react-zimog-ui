import type { ComponentPropsWithRef } from 'react';
import { Check } from 'lucide-react';
import { Checkable } from '@ui/headless';
import { Menu } from './Menu';
import { MenuItem } from './MenuItem';

const DISPLAY_NAME = 'MenuCheckboxItem';

type BaseProps = ComponentPropsWithRef<typeof Checkable>;
type MenuCheckboxItemProps = Omit<BaseProps, 'type'>;

export const MenuCheckboxItem = (inProps: MenuCheckboxItemProps) => {
  const { children, ...props } = inProps;

  Menu.useContext(DISPLAY_NAME);

  return (
    <MenuItem role="menuitemcheckbox" asChild>
      <Checkable {...props}>
        <Checkable.Indicator asChild>
          <Menu.Icon asChild>
            <Check />
          </Menu.Icon>
        </Checkable.Indicator>
        {children}
      </Checkable>
    </MenuItem>
  );
};

MenuCheckboxItem.displayName = DISPLAY_NAME;
