import type { ComponentPropsWithRef } from 'react';
import { composeHandlers } from '@ui/utils';
import { MenuContent } from './MenuContent';
import { MenuSub } from './MenuSub';

const DISPLAY_NAME = 'MenuSubContent';

type BaseProps = ComponentPropsWithRef<typeof MenuContent>;
type MenuSubContentProps = BaseProps;

export const MenuSubContent = (inProps: MenuSubContentProps) => {
  const { onBlur, onKeyDown, ...props } = inProps;

  const context = MenuSub.useContext(DISPLAY_NAME);

  return (
    <MenuContent
      side="right"
      align="start"
      distance={0}
      forceOpen={context.open}
      {...props}
      onBlur={composeHandlers(onBlur, () => {
        //context.onOpenChange(false);
      })}
      onKeyDown={composeHandlers(onKeyDown, (event) => {
        if (event.key === 'ArrowLeft') {
          context.onOpenChange(false);
          event.preventDefault();
        }
      })}
    />
  );
};

MenuSubContent.displayName = DISPLAY_NAME;
