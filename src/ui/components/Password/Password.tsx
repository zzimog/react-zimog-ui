import { useState } from 'react';
import { Native, type NativeProps } from '@ui/headless';
import { cn, createScopedContext } from '@ui/utils';
import { PasswordInput } from './PasswordInput';
import { PasswordRequirement } from './PasswordRequirement';
import { PasswordToggle } from './PasswordToggle';
import classes from './classes';

const DISPLAY_NAME = 'Password';

type PasswordContextValue = {
  value: string;
  visible: boolean;
  onValueChange(value: string): void;
  onVisibleChange(visible: boolean): void;
};

const [PasswordContext, usePasswordContext] = createScopedContext<
  PasswordContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type PasswordProps = NativeProps<'div'>;

export const Password = (inProps: PasswordProps) => {
  const { className, children, onChange, ...props } = inProps;

  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);

  return (
    <Native.div {...props} className={cn(classes.root, className)}>
      <PasswordContext
        value={value}
        visible={visible}
        onValueChange={setValue}
        onVisibleChange={setVisible}
      >
        {children}
      </PasswordContext>
    </Native.div>
  );
};

/*---------------------------------------------------------------------------*/

const PasswordInputGroup = ({ className, ...props }: NativeProps<'div'>) => (
  <Native.div {...props} className={cn(classes.inputGroup, className)} />
);

PasswordInputGroup.displayName = 'PasswordInputGroup';

/*---------------------------------------------------------------------------*/

Password.displayName = DISPLAY_NAME;
Password.Input = PasswordInput;
Password.InputGroup = PasswordInputGroup;
Password.Toggle = PasswordToggle;
Password.Requirement = PasswordRequirement;
Password.useContext = usePasswordContext;
