import {
  type Ref,
  type ElementType,
  type ReactNode,
  type HTMLAttributes,
  useState,
  Children,
} from 'react';
import { cn } from '../utils';
import { AccordionItem } from './AccordionItem';
import { AccordionContext } from './accordionContext';
import classes from './accordionClasses';

export type AccordionProps = {
  ref?: Ref<HTMLElement>;
  as?: ElementType;
  children: ReactNode;
} & (
  | {
      single: true;
      defaultValue?: string;
      value?: string;
      onChange?(value?: string): void;
    }
  | {
      single?: false;
      defaultValue?: string[];
      value?: string[];
      onChange?(value: string[]): void;
    }
) &
  Omit<HTMLAttributes<HTMLElement>, 'defaultValue' | 'value' | 'onChange'>;

export const Accordion = (inProps: AccordionProps) => {
  const {
    as: Tag = 'div',
    single,
    defaultValue,
    value: valueProp,
    className,
    children,
    onChange,
    ...props
  } = inProps;

  if (defaultValue && valueProp) {
    throw new Error(
      'Accordion cannot accept both `defaultValue` and `value` props.'
    );
  }

  const initValue = defaultValue || valueProp || (single ? '' : []);

  const [value, setValue] = useState<string | string[] | undefined>(initValue);

  function handleMultipleValues(itemValue: string, open: boolean) {
    setValue((prev) => {
      if (single || !Array.isArray(prev)) {
        return [];
      }

      const newValue = open
        ? [...prev, itemValue]
        : [...prev].filter((v) => v !== itemValue);

      onChange?.(newValue);
      return newValue;
    });
  }

  function handleSingleValue(itemValue: string, open: boolean) {
    setValue((prev) => {
      if (!single || Array.isArray(prev)) {
        return undefined;
      }

      const newVal = open ? itemValue : undefined;

      onChange?.(newVal);
      return newVal;
    });
  }

  const context = {
    value,
    setValue: single ? handleSingleValue : handleMultipleValues,
  };

  return (
    <Tag className={cn(classes.root, className)} {...props}>
      {Children.map(children, (child, index) => (
        <AccordionContext value={{ index, ...context }}>
          {child}
        </AccordionContext>
      ))}
    </Tag>
  );
};

Accordion.Item = AccordionItem;
