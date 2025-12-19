import { ChevronDown } from 'lucide-react';
import { type ComponentPropsWithRef, type ReactNode } from 'react';
import { Disclosure } from '../Disclosure';
import { cn } from '../utils';
import classes from './accordionClasses';

type AccordionProps = ComponentPropsWithRef<typeof Disclosure>;

export const Accordion = (inProps: AccordionProps) => {
  const { className, ...props } = inProps;

  return <Disclosure {...props} className={cn(classes.root, className)} />;
};

/*---------------------------------------------------------------------------*/

type AccordionItemProps = ComponentPropsWithRef<typeof Disclosure.Item> & {
  title?: ReactNode;
};

export const AccordionItem = (inProps: AccordionItemProps) => {
  const { title, className, children, ...props } = inProps;

  return (
    <Disclosure.Item {...props} className={cn(classes.item, className)}>
      <Disclosure.Trigger className={cn(classes.trigger, className)}>
        {title}
        <ChevronDown />
      </Disclosure.Trigger>
      <Disclosure.Content className={cn(classes.collapsible, className)}>
        <div className={classes.content}>{children}</div>
      </Disclosure.Content>
    </Disclosure.Item>
  );
};

Accordion.Item = AccordionItem;
Accordion.displayName = 'Accordion';
AccordionItem.displayName = 'AccordionItem';
