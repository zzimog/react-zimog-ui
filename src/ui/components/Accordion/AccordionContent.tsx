import type { ComponentProps } from 'react';
import { Disclosure, Native } from '@ui/headless';
import { cn } from '@ui/utils';
import classes from './classes';

type AccordionContentProps = Omit<
  ComponentProps<typeof Disclosure.Content>,
  'value'
>;

export const AccordionContent = (inProps: AccordionContentProps) => {
  const { className, ...props } = inProps;

  return (
    <Disclosure.Content className={classes.collapsible}>
      <Native.div {...props} className={cn(classes.content, className)} />
    </Disclosure.Content>
  );
};

AccordionContent.displayName = 'AccordionContent';
