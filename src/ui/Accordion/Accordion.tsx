import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cn } from '../utils';
import { AccordionItem } from './AccordionItem';
import AccordionContext from './accordionContext';

export type AccordionProps = {
  as?: ElementType;
  children: ReactNode;
} & HTMLAttributes<HTMLElement>;

export const Accordion = (inProps: AccordionProps) => {
  const { as, className, children, ...props } = inProps;

  const Tag = as || 'div';

  return (
    <Tag className={cn(className)} {...props}>
      <AccordionContext value={undefined}>{children}</AccordionContext>
    </Tag>
  );
};

Accordion.Item = AccordionItem;
