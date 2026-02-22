import { Native, type NativeProps } from '@ui/headless';
import { cn, composeHandlers } from '@ui/utils';
import { InputGroup } from './InputGroup';
import classes from './classes';

const DISPLAY_NAME = 'InputAddon';

type InputAddonProps = NativeProps<'div'>;

export const InputAddon = (inProps: InputAddonProps) => {
  const { className, onClick, ...props } = inProps;

  const { inputElement } = InputGroup.useContext(DISPLAY_NAME);

  return (
    <Native.div
      role="presentation"
      {...props}
      className={cn(classes.addon, className)}
      onClick={composeHandlers(onClick, () => {
        inputElement?.focus();
      })}
    />
  );
};

InputAddon.displayName = DISPLAY_NAME;
