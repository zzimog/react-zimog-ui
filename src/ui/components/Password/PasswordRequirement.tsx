import { Check, X } from 'lucide-react';
import { Native, type NativeProps } from '@ui/headless';
import { cn } from '@ui/utils';
import { Password } from './Password';
import classes from './classes';

const DISPLAY_NAME = 'PasswordRequirement';

type BaseProps = NativeProps<'div'>;
interface PasswordRequirementProps extends BaseProps {
  pattern: RegExp;
}

export const PasswordRequirement = (inProps: PasswordRequirementProps) => {
  const { pattern, className, children, ...props } = inProps;

  const { value } = Password.useContext(DISPLAY_NAME);
  const valid = pattern.test(value);

  return (
    <Native.div
      data-valid={valid}
      {...props}
      className={cn(classes.requirement, className)}
    >
      {valid ? <Check /> : <X />}
      {children}
    </Native.div>
  );
};

PasswordRequirement.displayName = DISPLAY_NAME;
