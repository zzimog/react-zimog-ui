import { Check, X } from 'lucide-react';
import { Native, type NativeProps } from '@ui/headless';
import { cn } from '@ui/utils';
import { Password } from './Password';
import classes from './classes';

const DISPLAY_NAME = 'PasswordRequirement';

type PasswordRequirementProps = NativeProps<'div'> & {
  pattern: RegExp;
};

function getState(match: boolean) {
  return match ? 'valid' : 'invalid';
}

export const PasswordRequirement = (inProps: PasswordRequirementProps) => {
  const { pattern, className, children, ...props } = inProps;

  const { value } = Password.useContext(DISPLAY_NAME);
  const match = pattern.test(value);

  return (
    <Native.div
      data-state={getState(match)}
      {...props}
      className={cn(classes.requirement, className)}
    >
      {match ? <Check /> : <X />}
      {children}
    </Native.div>
  );
};

PasswordRequirement.displayName = DISPLAY_NAME;
