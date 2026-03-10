import { Eye, EyeOff } from 'lucide-react';
import { Native, type NativeProps } from '@ui/headless';
import { cn, composeHandlers } from '@ui/utils';
import { Password } from './Password';
import classes from './classes';

const DISPLAY_NAME = 'PasswordToggle';

type PasswordToggleProps = NativeProps<'button'>;

export const PasswordToggle = (inProps: PasswordToggleProps) => {
  const { className, onClick, ...props } = inProps;

  const { visible, onVisibleChange } = Password.useContext(DISPLAY_NAME);

  return (
    <Native.button
      aria-label={visible ? 'Hide password' : 'Show password'}
      title={visible ? 'Hide password' : 'Show password'}
      {...props}
      className={cn(classes.toggle, className)}
      onClick={composeHandlers(onClick, () => {
        onVisibleChange(!visible);
      })}
    >
      {visible ? <EyeOff /> : <Eye />}
    </Native.button>
  );
};

PasswordToggle.displayName = DISPLAY_NAME;
