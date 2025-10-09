import {
  type Ref,
  type ElementType,
  type ReactNode,
  type HTMLAttributes,
  useId,
  useState,
  Children,
} from 'react';
import { cn } from '../utils';
import { AccordionItem } from './AccordionItem';
import { AccordionContext } from './accordionContext';
import classes from './accordionClasses';

type AccordionValue = string | string[] | undefined;

export type AccordionProps = {
  ref?: Ref<HTMLElement>;
  as?: ElementType;
  children: ReactNode;
} & (
  | {
      multiple?: false;
      defaultValue?: string;
      value?: string;
      onValueChange?: (value?: string) => void;
    }
  | {
      multiple: true;
      defaultValue?: string[];
      value?: string[];
      onValueChange?: (value: string[]) => void;
    }
) &
  Omit<HTMLAttributes<HTMLElement>, 'defaultValue' | 'value' | 'onChange'>;

export const Accordion = (inProps: AccordionProps) => {
  const {
    as: Tag = 'div',
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

  const baseId = useId();

  const initValue = valueProp || defaultValue || (multiple ? [] : undefined);
  const [value, setValue] = useState<AccordionValue>(initValue);

  const context = {
    baseId,
    value,
    setValue: (itemValue: string) => {
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
