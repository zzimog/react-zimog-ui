import { useEffect, useId, useRef, useState } from 'react';
import { type PolyProps, Poly } from '@ui';
import { AccordionItem } from './AccordionItem';
import { AccordionTrigger } from './AccordionTrigger';
import { AccordionContent } from './AccordionContent';
import { AccordionContext } from './accordionContext';

export type AccordionProps = PolyProps<'div'> & {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
};

export const Accordion = (inProps: AccordionProps) => {
  const {
    defaultValue = '',
    value = '',
    children,
    onValueChange,
    ...props
  } = inProps;

  const isControlled = !value && !onValueChange;
  const [_value, setValue] = useState(isControlled ? value : defaultValue);
  const prevValueRef = useRef(value);

  const baseId = useId();

  function handleChange(newValue: string) {
    if (isControlled) {
      setValue((prev) => {
        const shouldClose = newValue === prev;
        return shouldClose ? '' : newValue;
      });
    } else {
      const current = prevValueRef.current;
      const shouldClose = newValue === current;
      onValueChange?.(shouldClose ? '' : newValue);
    }
  }

  const context = {
    baseId,
    value: isControlled ? _value : value,
    onItemOpen(value: string) {
      handleChange(value);
    },
    onItemClose() {
      handleChange('');
    },
  };

  useEffect(() => {
    prevValueRef.current = value;
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
