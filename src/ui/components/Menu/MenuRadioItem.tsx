import type { ComponentPropsWithRef } from 'react';
import { CircleDot } from 'lucide-react';
import { Checkable } from '@ui/headless';
import { Menu } from './Menu';
import { MenuItem } from './MenuItem';
import { MenuRadioGroup } from './MenuRadioGroup';

const DISPLAY_NAME = 'MenuRadioItem';

type BaseProps = ComponentPropsWithRef<typeof MenuItem>;
type MenuRadioItemProps = BaseProps & {
  value: string;
  disabled?: boolean;
};

export const MenuRadioItem = (inProps: MenuRadioItemProps) => {
  const { value, disabled, children, ...props } = inProps;

  Menu.useContext(DISPLAY_NAME);
  const groupContext = MenuRadioGroup.useContext(DISPLAY_NAME);

  const isChecked = groupContext.value === value;
  const isDisabled = groupContext.disabled || disabled;

  return (
    <MenuItem role="menuitemradio" asChild>
      <Checkable
        type="radio"
        checked={isChecked}
        disabled={isDisabled}
        onCheckedChange={(checked) => {
          if (!checked) return;
          groupContext.onValueChange(value);
        }}
        {...props}
      >
        <Checkable.Indicator asChild>
          <Menu.Icon asChild>
            <CircleDot />
          </Menu.Icon>
        </Checkable.Indicator>
        {children}
      </Checkable>
    </MenuItem>
  );
};

MenuRadioItem.displayName = DISPLAY_NAME;
