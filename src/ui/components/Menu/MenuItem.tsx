import { Native, type NativeProps } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';
import { cn, composeHandlers } from '@ui/utils';
import { Menu } from './Menu';
import classes from './classes';

const NAV_KEYS = ['Home', 'End', 'ArrowUp', 'ArrowDown'];

const DISPLAY_NAME = 'MenuItem';

type BaseProps = NativeProps<'button'>;
type MenuItemProps = Omit<BaseProps, 'type'>;

export const MenuItem = (inProps: MenuItemProps) => {
  const {
    ref: refProp,
    disabled,
    className,
    onPointerMove,
    onKeyDown,
    ...props
  } = inProps;

  const context = Menu.useContext(DISPLAY_NAME);
  const { getItems, onItemAdd, onItemRemove } = Menu.useCollection();

  const mergedRef = useMergedRefs(refProp, (node: HTMLElement) => {
    onItemAdd(node, { node, disabled });
    return () => onItemRemove(node);
  });

  return (
    <Native.button
      ref={mergedRef}
      role="menuitem"
      type="button"
      {...props}
      className={cn(classes.item, className)}
      onPointerMove={composeHandlers(onPointerMove, (event) => {
        const target = event.target as HTMLElement;
        target.focus({ preventScroll: true });
      })}
      onKeyDown={composeHandlers(onKeyDown, (event) => {
        if (event.key === 'Tab') {
          event.preventDefault();
        }

        if (event.target !== event.currentTarget) {
          return;
        }

        if (NAV_KEYS.includes(event.key)) {
          const items = getItems();
          const activeNodes = items
            .filter((item) => !item.disabled)
            .map((i) => i.node);

          const active = event.currentTarget;
          const index = activeNodes.indexOf(active);
          const nextIndexValues: Record<string, number> = {
            Home: 0,
            End: activeNodes.length - 1,
            ArrowUp: Math.max(0, index - 1),
            ArrowDown: Math.min(activeNodes.length - 1, index + 1),
          };

          const nextIndex = nextIndexValues[event.key] ?? 0;
          const nextNode = activeNodes[nextIndex];
          const [first, ...others] = items.map((i) => i.node);
          const [last] = others.slice(-1);

          if (nextNode === first) {
            context.onKeyFocusFirst();
          } else if (nextNode === last) {
            context.onKeyFocusLast();
          }

          nextNode?.focus();
          event.preventDefault();
        }
      })}
    />
  );
};

MenuItem.displayName = DISPLAY_NAME;
