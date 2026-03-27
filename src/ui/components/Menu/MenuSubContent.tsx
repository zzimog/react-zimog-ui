import type { ComponentPropsWithRef } from 'react';
import { composeHandlers } from '@ui/utils';
import { Menu } from './Menu';
import { MenuContent } from './MenuContent';
import { MenuSub } from './MenuSub';

const DISPLAY_NAME = 'MenuSubContent';

type BaseProps = ComponentPropsWithRef<typeof MenuContent>;
type MenuSubContentProps = BaseProps;

export const MenuSubContent = (inProps: MenuSubContentProps) => {
  const { onKeyDown, ...props } = inProps;

  const context = Menu.useContext(DISPLAY_NAME);
  const subContext = MenuSub.useContext(DISPLAY_NAME);

  return (
    <Menu.Collection>
      <MenuContent
        side="right"
        align="start"
        distance={0}
        id={subContext.contentId}
        aria-labelledby={subContext.triggerId}
        {...props}
        onKeyDown={composeHandlers(onKeyDown, (event) => {
          if (event.key === 'ArrowLeft') {
            context.onOpenChange(false);
            event.preventDefault();
          }
        })}
      />
    </Menu.Collection>
  );
};

MenuSubContent.displayName = DISPLAY_NAME;
