import type { ComponentPropsWithRef } from 'react';
import { Check } from 'lucide-react';
import { Checkable } from '@ui/headless';
import { cn } from '@ui/utils';
import classes from './classes';

type BaseProps = ComponentPropsWithRef<typeof Checkable>;
type CheckboxProps = BaseProps;

export const Checkbox = (inProps: CheckboxProps) => {
  const { className, ...props } = inProps;

  return (
    <Checkable {...props} className={cn(classes.root, className)}>
      <Checkable.Indicator asChild className={classes.indicator}>
        <Check />
      </Checkable.Indicator>
    </Checkable>
  );
};
