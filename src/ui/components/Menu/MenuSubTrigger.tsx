import { type ComponentPropsWithRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { Popper } from '@ui/headless';
import { composeHandlers } from '../../utils/compose-handlers';
import { Menu } from './Menu';
import { MenuSub } from './MenuSub';

const DISPLAY_NAME = 'MenuSubTrigger';

type BaseProps = ComponentPropsWithRef<typeof Menu.Item>;
type MenuSubTriggerProps = BaseProps;

export const MenuSubTrigger = (inProps: MenuSubTriggerProps) => {
  const { children, onClick, onKeyDown, ...props } = inProps;

  const context = Menu.useContext(DISPLAY_NAME);
  const subContext = MenuSub.useContext(DISPLAY_NAME);

  return (
    <Popper.Anchor asChild>
      <Menu.Item
        id={subContext.triggerId}
        aria-haspopup="menu"
        aria-expanded={context.open}
        aria-controls={subContext.contentId}
        {...props}
        onClick={composeHandlers(onClick, () => {
          if (!props.disabled) {
            subContext.onOpenToggle();
          }
        })}
        onKeyDown={composeHandlers(onKeyDown, (event) => {
          if (event.key === 'ArrowRight') {
            context.onOpenChange(true);
            event.preventDefault();
          }
        })}
      >
        {children}
        <ChevronRight />
      </Menu.Item>
    </Popper.Anchor>
  );
};

MenuSubTrigger.displayName = DISPLAY_NAME;
