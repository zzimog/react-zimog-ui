import type { NativeProps } from '@ui/headless';
import { Input } from '@ui/components';
import { cn, composeHandlers } from '@ui/utils';
import { Password } from './Password';
import classes from './classes';

const DISPLAY_NAME = 'PasswordInput';

type PasswordInputProps = NativeProps<'input'>;

export const PasswordInput = (inProps: PasswordInputProps) => {
  const { className, onChange, ...props } = inProps;

  const { visible, onValueChange } = Password.useContext(DISPLAY_NAME);

  return (
    <Input
      type={visible ? 'text' : 'password'}
      {...props}
      className={cn(classes.input, className)}
      onChange={composeHandlers(onChange, (e) => {
        onValueChange(e.target.value);
      })}
    />
  );
};

PasswordInput.displayName = DISPLAY_NAME;
