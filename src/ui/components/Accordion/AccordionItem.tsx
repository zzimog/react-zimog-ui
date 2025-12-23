import type { ComponentProps } from 'react';
import { Disclosure } from '@ui/headless';
import { cn } from '@ui/utils';
import classes from './classes';

type AccordionItemProps = ComponentProps<typeof Disclosure.Item>;

export const AccordionItem = (inProps: AccordionItemProps) => {
  const { className, ...props } = inProps;

  return <Disclosure.Item {...props} className={cn(classes.item, className)} />;
};

AccordionItem.displayName = 'AccordionItem';
