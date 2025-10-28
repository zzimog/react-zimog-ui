import { useId, useLayoutEffect, useState } from 'react';
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

  const context = {
    baseId,
    value,
    onValueChange(value: string) {
      setValue((prev) => {
        const isCurrent = value === prev;

        console.log('set', value);

        return isCurrent ? '' : value;
      });
    },
  };

  useLayoutEffect(() => {
    onValueChange?.(value);
  }, [value]);

  return (
    <Poly.div {...props}>
      <AccordionContext value={context}>{children}</AccordionContext>
    </Poly.div>
  );
};

Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;
