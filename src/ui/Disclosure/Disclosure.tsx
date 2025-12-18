import { Fragment } from 'react';
import { useControllableState } from '../hooks';
import { type NativeProps, Native } from '../Native';
import { DisclosureContent } from './DisclosureContent';
import { DisclosureContext } from './disclosureContext';
import { DisclosureItem } from './DisclosureItem';
import { DisclosureTrigger } from './DisclosureTrigger';

type DisclosureSingleProps = NativeProps<'div'> & {
  multiple?: false;
  value?: string;
  defaultValue?: string;
  onValueChange?(value: string): void;
};

const DisclosureSingle = (inProps: DisclosureSingleProps) => {
  const {
    defaultValue = '',
    value: valueProp,
    children,
    onValueChange,
    ...props
  } = inProps;

  const [value, setValue] = useControllableState({
    defaultValue,
    prop: valueProp,
    onChange: onValueChange,
  });

  return (
    <Native.div as={Fragment} {...props}>
      <DisclosureContext
        value={value ? [value] : []}
        onItemOpen={setValue}
        onItemClose={() => setValue('')}
      >
        {children}
      </DisclosureContext>
    </Native.div>
  );
};

type DisclosureMultipleProps = NativeProps<'div'> & {
  multiple: true;
  value?: string[];
  defaultValue?: string[];
  onValueChange?(value: string[]): void;
};

const DisclosureMultiple = (inProps: DisclosureMultipleProps) => {
  const {
    defaultValue = [],
    value: valueProp,
    onValueChange,
    children,
    ...props
  } = inProps;

  const [value, setValue] = useControllableState({
    defaultValue,
    prop: valueProp,
    onChange: onValueChange,
  });

  return (
    <Native.div as={Fragment} {...props}>
      <DisclosureContext
        value={value}
        onItemOpen={(itemValue) => {
          setValue((prevValue) => [...prevValue, itemValue]);
        }}
        onItemClose={(itemValue) => {
          setValue((prevValue) =>
            prevValue.filter((value) => value !== itemValue)
          );
        }}
      >
        {children}
      </DisclosureContext>
    </Native.div>
  );
};

type DisclosureProps = DisclosureMultipleProps | DisclosureSingleProps;

export const Disclosure = (inProps: DisclosureProps) => {
  const { multiple, ...props } = inProps;

  return multiple ? (
    <DisclosureMultiple {...(props as DisclosureMultipleProps)} />
  ) : (
    <DisclosureSingle {...(props as DisclosureSingleProps)} />
  );
};

Disclosure.displayName = 'Disclosure';
Disclosure.Trigger = DisclosureTrigger;
Disclosure.Item = DisclosureItem;
Disclosure.Content = DisclosureContent;
