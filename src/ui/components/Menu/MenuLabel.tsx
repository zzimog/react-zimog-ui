import { Native, type NativeProps } from '@ui/headless';
import { cn } from '@ui/utils';
import classes from './classes';

const DISPLAY_NAME = 'MenuLabel';

type BaseProps = NativeProps<'div'>;
type MenuLabelProps = BaseProps;

export const MenuLabel = (inProps: MenuLabelProps) => {
  const { className, ...props } = inProps;

  return (
    <Native.div
      role="presentation"
      {...props}
      className={cn(classes.label, className)}
    />
  );
};

MenuLabel.displayName = DISPLAY_NAME;
