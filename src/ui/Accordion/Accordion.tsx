import {
  type Ref,
  type ElementType,
  type ReactNode,
  type HTMLAttributes,
  useState,
} from 'react';
import { cn } from '../utils';
import { AccordionItem } from './AccordionItem';
import AccordionContext from './accordionContext';
import classes from './accordionClasses';

export type AccordionProps = {
  ref?: Ref<HTMLElement>;
  as?: ElementType;
  children: ReactNode;
} & (
  | {
      single: true;
      defaultValue?: string;
      onChange?: (value: string) => void;
    }
  | {
      single?: false;
      defaultValue?: string[];
      onChange?: (value: string[]) => void;
    }
) &
  Omit<HTMLAttributes<HTMLElement>, 'defaultValue' | 'onChange'>;

export const Accordion = (inProps: AccordionProps) => {
  const {
    as: Tag = 'div',
    single,
    defaultValue,
    className,
    children,
    onChange,
    ...props
  } = inProps;

  const initValue = defaultValue || (single ? '' : []);

  const [value, setValue] = useState<string | string[]>(initValue);

  const context = {
    value,
    setValue: (itemValue: string) => {
      setValue(itemValue);
    },
  };

  return (
    <Tag className={cn(classes.root, className)} {...props}>
      <AccordionContext value={context}>{children}</AccordionContext>
    </Tag>
  );
};

Accordion.Item = AccordionItem;
