import { Native, type NativeProps } from '@ui/headless';
import { cn } from '@ui/utils';
import classes from './classes';

const DISPLAY_NAME = 'MenuSeparator';

type BaseProps = NativeProps<'div'>;
type MenuSeparatorProps = BaseProps;

export const MenuSeparator = (inProps: MenuSeparatorProps) => {
  const { className, ...props } = inProps;

  return (
    <Native.div
      role="separator"
      aria-orientation="horizontal"
      {...props}
      className={cn(classes.separator, className)}
    />
  );
};

MenuSeparator.displayName = DISPLAY_NAME;
