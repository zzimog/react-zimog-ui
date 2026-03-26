import { Native, type NativeProps } from '@ui/headless';
import { cn } from '@ui/utils';
import { Menu } from './Menu';
import classes from './classes';

const DISPLAY_NAME = 'MenuIcon';

type BaseProps = NativeProps<'span'>;
type MenuIconProps = BaseProps;

export const MenuIcon = (inProps: MenuIconProps) => {
  const { className, ...props } = inProps;

  Menu.useContext(DISPLAY_NAME);

  return <Native.span {...props} className={cn(classes.icon, className)} />;
};

MenuIcon.displayName = DISPLAY_NAME;
