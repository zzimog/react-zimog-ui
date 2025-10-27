import { useId, useState } from 'react';
import { type PolyProps, Poly } from '@ui';
import { AccordionItem } from './AccordionItem';
import { AccordionTrigger } from './AccordionTrigger';
import { AccordionContent } from './AccordionContent';
import { AccordionContext } from './accordionContext';

export type AccordionProps = PolyProps<'div'> & {
  defaultValue?: string;
  onValueChange?(value: string): void;
};

export const Accordion = (inProps: AccordionProps) => {
  const { defaultValue, children, onValueChange, ...props } = inProps;

  const [value, setValue] = useState(defaultValue || '');

  const baseId = useId();

  function handleValueChange(value: string) {
    onValueChange?.(value);
    setValue(value);
  }

  const context = {
    baseId,
    value,
    onValueChange(newValue: string) {
      handleValueChange(newValue === value ? '' : newValue);
    },
  };

  return (
    <Poly.div {...props}>
      <AccordionContext value={context}>{children}</AccordionContext>
    </Poly.div>
  );
};

Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;
