import {
  useId,
  useState,
  type ElementType,
  type HTMLAttributes,
  type Ref,
} from 'react';
import DisclosureContext from './disclosureContext';
import { DisclosureTrigger } from './DisclosureTrigger';
import { DisclosureContent } from './DisclosureContent';

export type DisclosureProps = {
  as?: ElementType;
  ref?: Ref<HTMLElement>;
} & (
  | {
      multiple?: false;
      defaultValue?: string;
      value?: string;
      onValueChange?(value: string): void;
    }
  | {
      multiple: true;
      defaultValue?: string[];
      value?: string[];
      onValueChange?(value: string[]): void;
    }
) &
  HTMLAttributes<HTMLElement>;

export const Disclosure = (inProps: DisclosureProps) => {
  const {
    as: Tag = 'div',
    multiple,
    defaultValue,
    value: valueProp,
    onValueChange,
    children,
    ...props
  } = inProps;

  const baseId = useId();

  const initValue = defaultValue || valueProp || (multiple ? [] : '');
  const [value, setValue] = useState(initValue);

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
    <Tag {...props}>
      <DisclosureContext value={context}>{children}</DisclosureContext>
    </Tag>
  );
};

Disclosure.Trigger = DisclosureTrigger;
Disclosure.Content = DisclosureContent;
