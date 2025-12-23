import { Fragment } from 'react';
import { Native, type NativeProps } from '@ui/headless';
import { AccordionContent } from './AccordionContent';
import { AccordionItem } from './AccordionItem';
import { AccordionTrigger } from './AccordionTrigger';

type AccordionProps = NativeProps<'div'>;

export const Accordion = (inProps: AccordionProps) => {
  const { ...props } = inProps;

  return <Native.div as={Fragment} {...props} />;
};

Accordion.displayName = 'Accordion';
Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;
