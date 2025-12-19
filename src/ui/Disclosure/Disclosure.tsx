import type { PropsWithChildren } from 'react';
import { useControllableState } from '../hooks';
import { type NativeProps, Native } from '../Native';
import { DisclosureContent } from './DisclosureContent';
import { DisclosureContext } from './disclosureContext';
import { DisclosureItem } from './DisclosureItem';
import { DisclosureTrigger } from './DisclosureTrigger';

type DisclosureSingleProps = PropsWithChildren<{
  multiple?: false;
  value?: string;
  defaultValue?: string;
  onValueChange?(value: string): void;
}>;

const DisclosureSingle = (inProps: DisclosureSingleProps) => {
  const {
    defaultValue = '',
    value: valueProp,
    children,
    onValueChange,
  } = inProps;

  const [value, setValue] = useControllableState({
    defaultValue,
    prop: valueProp,
    onChange: onValueChange,
  });

  return (
    <DisclosureContext
      value={value ? [value] : []}
      onItemOpen={setValue}
      onItemClose={() => setValue('')}
    >
      {children}
    </DisclosureContext>
  );
};

type DisclosureMultipleProps = PropsWithChildren<{
  multiple: true;
  value?: string[];
  defaultValue?: string[];
  onValueChange?(value: string[]): void;
}>;

const DisclosureMultiple = (inProps: DisclosureMultipleProps) => {
  const {
    defaultValue = [],
    value: valueProp,
    onValueChange,
    children,
  } = inProps;

  const [value, setValue] = useControllableState({
    defaultValue,
    prop: valueProp,
    onChange: onValueChange,
  });

  return (
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
  );
};

type DisclosureProps = NativeProps<'div'> &
  (DisclosureMultipleProps | DisclosureSingleProps);

export const Disclosure = (inProps: DisclosureProps) => {
  const { multiple, value, defaultValue, children, onValueChange, ...props } =
    inProps;

  const disclosureProps = {
    multiple,
    value,
    defaultValue,
    children,
    onValueChange,
  };

  return (
    <Native.div {...props}>
      {multiple ? (
        <DisclosureMultiple {...(disclosureProps as DisclosureMultipleProps)} />
      ) : (
        <DisclosureSingle {...(disclosureProps as DisclosureSingleProps)} />
      )}
    </Native.div>
  );
};

Disclosure.displayName = 'Disclosure';
Disclosure.Trigger = DisclosureTrigger;
Disclosure.Item = DisclosureItem;
Disclosure.Content = DisclosureContent;
