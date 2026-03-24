import { Native, type NativeProps } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';
import { cn } from '@ui/utils';
import { Menu } from './Menu';

const DISPLAY_NAME = 'MenuItem';

type BaseProps = NativeProps<'button'>;
type MenuItemProps = BaseProps;

export const MenuItem = (inProps: MenuItemProps) => {
  const { ref: refProp, disabled, className, ...props } = inProps;

  const { onItemAdd, onItemRemove } = Menu.useCollection();

  const mergedRef = useMergedRefs(refProp, (node: HTMLElement) => {
    onItemAdd(node, { node, disabled });
    return () => onItemRemove(node);
  });

  return (
    <Native.button
      ref={mergedRef}
      role="menuitem"
      tabIndex={0}
      {...props}
      className={cn(
        'p-2',
        'rounded-shape',
        'outline-0',
        'focus:bg-highlight',
        className
      )}
      onPointerMove={(event) => {
        const target = event.target as HTMLElement;
        target.focus({ preventScroll: true });
      }}
    />
  );
};

MenuItem.displayName = DISPLAY_NAME;
