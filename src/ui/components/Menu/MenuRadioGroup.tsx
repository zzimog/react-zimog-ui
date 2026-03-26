import { Native, type NativeProps } from '@ui/headless';
import { useControllableState } from '@ui/hooks';
import { createScopedContext } from '@ui/utils';
import { Menu } from './Menu';

const DISPLAY_NAME = 'MenuRadioGroup';

type MenuRadioGroupContextValue = {
  value: string;
  disabled?: boolean;
  onValueChange(value: string): void;
};

const [MenuRadioGroupContext, useMenuRadioGroupContext] = createScopedContext<
  MenuRadioGroupContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type MenuRadioGroupProps = NativeProps<'div'> & {
  defaultValue?: string;
  value?: string;
  disabled?: boolean;
  onValueChange?(value: string): void;
};

export const MenuRadioGroup = (inProps: MenuRadioGroupProps) => {
  const {
    defaultValue = '',
    value: valueProp,
    disabled,
    onValueChange,
    ...props
  } = inProps;

  const [value, setValue] = useControllableState({
    defaultProp: defaultValue,
    prop: valueProp,
    onChange: onValueChange,
  });

  Menu.useContext(DISPLAY_NAME);

  return (
    <MenuRadioGroupContext
      value={value}
      disabled={disabled}
      onValueChange={setValue}
    >
      <Native.div
        role="group"
        aria-disabled={disabled ? true : undefined}
        {...props}
      />
    </MenuRadioGroupContext>
  );
};

MenuRadioGroup.displayName = DISPLAY_NAME;
MenuRadioGroup.useContext = useMenuRadioGroupContext;
