import { Native, Popper, type NativeProps } from '@ui/headless';
import { composeHandlers } from '../../utils/compose-handlers';
import { Menu } from './Menu';

const DISPLAY_NAME = 'MenuTrigger';

type BaseProps = NativeProps<'button'>;
type MenuTriggerProps = BaseProps;

export const MenuTrigger = (inProps: MenuTriggerProps) => {
  const { onClick, ...props } = inProps;

  const context = Menu.useContext(DISPLAY_NAME);
  const isOpen = context.open;

  return (
    <Popper.Anchor asChild>
      <Native.button
        aria-haspopup="menu"
        aria-expanded={isOpen}
        {...props}
        onClick={composeHandlers(onClick, (event) => {
          context.onOpenChange(!isOpen);
          event.preventDefault();
        })}
      />
    </Popper.Anchor>
  );
};

MenuTrigger.displayName = DISPLAY_NAME;
