import { FocusTrap, Native, type NativeProps } from '@ui/headless';
import { cn } from '@ui/utils';
import { Menu } from './Menu';

const DISPLAY_NAME = 'MenuContent';

type MenuContentProps = NativeProps<'div'>;

const NAV_KEYS = ['Home', 'End', 'ArrowUp', 'ArrowDown'];

export const MenuContent = (inProps: MenuContentProps) => {
  const { className, ...props } = inProps;

  const context = Menu.useContext(DISPLAY_NAME);
  const { getItems } = Menu.useCollection();

  return (
    <FocusTrap trapped={context.open} asChild>
      <Native.div
        role="menu"
        tabIndex={-1}
        {...props}
        className={cn('flex flex-col gap-2', className)}
        onKeyDown={(event) => {
          if (event.key === 'Tab') {
            event.preventDefault();
          }

          if (NAV_KEYS.includes(event.key)) {
            const items = getItems().filter((item) => !item.disabled);

            const active = document.activeElement as HTMLElement | null;
            const index = items.findIndex((i) => i.node === active);

            const nextIndexValues: Record<string, number> = {
              Home: 0,
              End: items.length - 1,
              ArrowUp: Math.max(0, index - 1),
              ArrowDown: Math.min(items.length - 1, index + 1),
            };

            const nextIndex = nextIndexValues[event.key] ?? 0;
            const nextNode = items[nextIndex]?.node;

            nextNode?.focus({ preventScroll: true });
            event.preventDefault();
          }
        }}
      />
    </FocusTrap>
  );
};

MenuContent.displayName = DISPLAY_NAME;
