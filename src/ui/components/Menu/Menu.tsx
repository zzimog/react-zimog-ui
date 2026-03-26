import { useCallback, useRef } from 'react';
import { FocusTrap, Native, type NativeProps } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';
import { cn, createCollection, createScopedContext } from '@ui/utils';
import { MenuCheckboxItem } from './MenuCheckboxItem';
import { MenuIcon } from './MenuIcon';
import { MenuItem } from './MenuItem';
import { MenuLabel } from './MenuLabel';
import { MenuRadioGroup } from './MenuRadioGroup';
import { MenuRadioItem } from './MenuRadioItem';
import { MenuSeparator } from './MenuSeparator';
import classes from './classes';

const DISPLAY_NAME = 'Menu';

type MenuContextValue = {
  onKeyFocusFirst(): void;
  onKeyFocusLast(): void;
};

const [MenuContext, useMenuContext] = createScopedContext<
  MenuContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type MenuCollectionData = {
  node: HTMLElement;
  disabled?: boolean;
};

const [MenuCollection, useMenuCollection] =
  createCollection<MenuCollectionData>(DISPLAY_NAME);

/*---------------------------------------------------------------------------*/

type BaseProps = NativeProps<'div'>;
type MenuProps = BaseProps;

export const Menu = (inProps: MenuProps) => {
  const { ref: refProp, className, ...props } = inProps;

  const ref = useRef<HTMLElement>(null);
  const mergedRef = useMergedRefs(refProp, ref);

  const handleFocusEdge = useCallback((edge: 'first' | 'last') => {
    const node = ref.current;
    const top = edge === 'first' ? 0 : node?.scrollHeight;

    node?.scrollTo({ top });
  }, []);

  return (
    <MenuContext
      onKeyFocusFirst={() => handleFocusEdge('first')}
      onKeyFocusLast={() => handleFocusEdge('last')}
    >
      <MenuCollection>
        <FocusTrap trapped={false} asChild>
          <Native.div
            ref={mergedRef}
            role="menu"
            {...props}
            className={cn(classes.root, className)}
          />
        </FocusTrap>
      </MenuCollection>
    </MenuContext>
  );
};

Menu.displayName = DISPLAY_NAME;
Menu.useContext = useMenuContext;
Menu.useCollection = useMenuCollection;
Menu.Item = MenuItem;
Menu.Label = MenuLabel;
Menu.Separator = MenuSeparator;
Menu.Icon = MenuIcon;
Menu.RadioGroup = MenuRadioGroup;
Menu.RadioItem = MenuRadioItem;
Menu.CheckboxItem = MenuCheckboxItem;
