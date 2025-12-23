import type { ComponentProps } from 'react';
import { ChevronDown } from 'lucide-react';
import { Disclosure } from '@ui/headless';
import { cn } from '@ui/utils';
import classes from './classes';

type AccordionTriggerProps = Omit<
  ComponentProps<typeof Disclosure.Trigger>,
  'value'
>;

export const AccordionTrigger = (inProps: AccordionTriggerProps) => {
  const { className, children, ...props } = inProps;

  return (
    <Disclosure.Trigger {...props} className={cn(classes.trigger, className)}>
      {children as any}
      <ChevronDown className={classes.arrow} />
    </Disclosure.Trigger>
  );
};

AccordionTrigger.displayName = 'AccordionTrigger';
