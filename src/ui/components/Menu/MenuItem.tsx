import { Native, type NativeProps } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';
import { cn } from '@ui/utils';
import { Menu } from './Menu';
import classes from './classes';

const DISPLAY_NAME = 'MenuItem';

type BaseProps = NativeProps<'button'>;
type MenuItemProps = Omit<BaseProps, 'type'>;

export const MenuItem = (inProps: MenuItemProps) => {
  const { ref: refProp, disabled, className, ...props } = inProps;

  Menu.useContext(DISPLAY_NAME);
  const { onItemAdd, onItemRemove } = Menu.useCollection();

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
      onPointerMove={(event) => {
        const target = event.target as HTMLElement;
        target.focus({ preventScroll: true });
      }}
    />
  );
};

MenuItem.displayName = DISPLAY_NAME;
