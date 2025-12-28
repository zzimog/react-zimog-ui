import { Native, type NativeProps } from '@ui/headless';
import { cn } from '@ui/utils';
import { useInputGroup } from './context';
import classes from './classes';

const DISPLAY_NAME = 'InputAddon';

type InputAddonProps = NativeProps<'div'>;

export const InputAddon = (inProps: InputAddonProps) => {
  const { className, onClick, ...props } = inProps;

  const { inputElement } = useInputGroup(DISPLAY_NAME);

  return (
    <Native.div
      {...props}
      className={cn(classes.addon, className)}
      onClick={onClick || (() => inputElement?.focus())}
    />
  );
};

InputAddon.displayName = DISPLAY_NAME;
