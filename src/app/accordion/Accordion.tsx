import { useId } from 'react';
import { type PolyProps, cn, Poly, useControllableState } from '@ui';
import { AccordionItem } from './AccordionItem';
import { AccordionTrigger } from './AccordionTrigger';
import { AccordionContent } from './AccordionContent';
import { AccordionContext } from './accordionContext';
import classes from './accordionClasses';

export type AccordionProps = PolyProps<'div'> & {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
};

export const Accordion = (inProps: AccordionProps) => {
  const {
    value: valueProp = '',
    defaultValue = '',
    className,
    children,
    onValueChange,
    ...props
  } = inProps;

  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultValue,
    onChange: onValueChange,
  });

  const baseId = useId();

  const context = {
    baseId,
    value,
    onItemOpen(newValue: string) {
      setValue(newValue);
    },
    onItemClose() {
      setValue('');
    },
  };

  return (
    <Poly.div className={cn(classes.root, className)} {...props}>
      <AccordionContext value={context}>{children}</AccordionContext>
    </Poly.div>
  );
};

Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;
