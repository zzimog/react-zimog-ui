import { type Ref, type ElementType, type ReactNode, useState } from 'react';
import { type PolyProps, Poly } from '../polymorphic';
import { cn } from '../utils';
import { AccordionItem } from './AccordionItem';
import { AccordionContext } from './accordionContext';
import classes from './accordionClasses';
import { Highlight } from '../Highlight';

export type AccordionValue = string | string[] | undefined;

export type AccordionBaseProps = PolyProps<typeof Poly.div> & {
  ref?: Ref<HTMLElement>;
  as?: ElementType;
  children: ReactNode;
};

export type AccordionSingleProps = {
  multiple?: false;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value?: string) => void;
};

export type AccordionMultipleProps = {
  multiple: true;
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
};

export type AccordionProps = AccordionBaseProps &
  (AccordionSingleProps | AccordionMultipleProps);

export const Accordion = (inProps: AccordionProps) => {
  const {
    multiple,
    defaultValue,
    value: valueProp,
    className,
    children,
    onValueChange,
    ...props
  } = inProps;

  if (defaultValue && valueProp) {
    throw new Error(
      'Accordion cannot accept both `defaultValue` and `value` props.'
    );
  }

  const initValue = valueProp || defaultValue || (multiple ? [] : undefined);
  const [value, setValue] = useState<AccordionValue>(initValue);

  const context = {
    value,
    setValue(itemValue: string) {
      if (multiple) {
        if (!Array.isArray(value)) {
          return;
        }

        const newValue = value.includes(itemValue)
          ? value.filter((v) => v !== itemValue)
          : [...value, itemValue];

        onValueChange?.(newValue);
        setValue(newValue);
      } else {
        const isCurrent = itemValue === value;
        const newVal = isCurrent ? '' : itemValue;

        onValueChange?.(newVal);
        setValue(newVal);
      }
    },
  };

  return (
    <Highlight type="hover" className={cn(classes.root, className)} {...props}>
      <Highlight.Indicator className={classes.highlight} />
      <AccordionContext value={context}>{children}</AccordionContext>
    </Highlight>
  );
};

Accordion.Item = AccordionItem;
