import { useId } from 'react';
import { useControllableState } from '../hooks';
import { Poly, type PolyProps } from '../polymorphic';
import { cn } from '../utils';
import classes from './accordionClasses';
import { AccordionContent } from './AccordionContent';
import { AccordionContext } from './accordionContext';
import { AccordionItem } from './AccordionItem';
import { AccordionTrigger } from './AccordionTrigger';

export type AccordionProps = PolyProps<'div'> & {
  collapse?: boolean;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

export const Accordion = (inProps: AccordionProps) => {
  const {
    collapse = true,
    value: valueProp,
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
    collapse,
    value,
    onItemOpen(newValue: string) {
      setValue(newValue);
    },
    onItemClose() {
      if (collapse) {
        setValue('');
      }
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
