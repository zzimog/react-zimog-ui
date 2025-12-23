import type { ComponentProps } from 'react';
import { ChevronDown } from 'lucide-react';
import { Disclosure, Native } from '@ui/headless';
import { cn } from '@ui/utils';
import classes from './classes';

type AccordionProps = ComponentProps<typeof Disclosure>;

export const Accordion = (inProps: AccordionProps) => {
  const { className, ...props } = inProps;
  return <Disclosure {...props} className={cn(classes.root, className)} />;
};

Accordion.displayName = 'Accordion';

/*---------------------------------------------------------------------------*/

type AccordionItemProps = ComponentProps<typeof Disclosure.Item>;

const AccordionItem = (inProps: AccordionItemProps) => {
  const { className, ...props } = inProps;

  return <Disclosure.Item {...props} className={cn(classes.item, className)} />;
};

AccordionItem.displayName = 'AccordionItem';
Accordion.Item = AccordionItem;

/*---------------------------------------------------------------------------*/

type AccordionTriggerProps = Omit<
  ComponentProps<typeof Disclosure.Trigger>,
  'value'
>;

const AccordionTrigger = (inProps: AccordionTriggerProps) => {
  const { className, children, ...props } = inProps;

  return (
    <Disclosure.Trigger {...props} className={cn(classes.trigger, className)}>
      {children as any}
      <ChevronDown className={classes.arrow} />
    </Disclosure.Trigger>
  );
};

AccordionTrigger.displayName = 'AccordionTrigger';
Accordion.Trigger = AccordionTrigger;

/*---------------------------------------------------------------------------*/

type AccordionContentProps = Omit<
  ComponentProps<typeof Disclosure.Content>,
  'value'
>;

const AccordionContent = (inProps: AccordionContentProps) => {
  const { className, ...props } = inProps;

  return (
    <Disclosure.Content className={classes.collapsible}>
      <Native.div {...props} className={cn(classes.content, className)} />
    </Disclosure.Content>
  );
};

AccordionContent.displayName = 'AccordionContent';
Accordion.Content = AccordionContent;
