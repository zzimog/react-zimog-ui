import {
  type Ref,
  type ElementType,
  type ReactNode,
  type HTMLAttributes,
  useState,
} from 'react';
import { cn } from '../utils';
import { AccordionItem } from './AccordionItem';
import { AccordionContext } from './accordionContext';
import classes from './accordionClasses';
import { Highlight } from '../Highlight';

type AccordionValue = string | string[] | undefined;

type AccordionProps = {
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

const AccordionRoot = (inProps: AccordionProps) => {
  const {
    as: Tag = 'div',
    multiple,
    defaultValue,
    value: valueProp,
    className,
    children,
    onValueChange,
    onMouseOver,
    onMouseLeave,
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
    <Highlight
      as={Tag}
      type="hover"
      className={cn(classes.root, className)}
      {...props}
    >
      <Highlight.Indicator className={classes.highlight} />
      <AccordionContext value={context}>{children}</AccordionContext>
    </Highlight>
  );
};

export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
});

export type { AccordionProps };
