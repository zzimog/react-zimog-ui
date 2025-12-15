import { type PropsWithChildren } from 'react';
import { useControllableState } from '../hooks';
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

type DisclosureProps = DisclosureMultipleProps | DisclosureSingleProps;

export const Disclosure = (inProps: DisclosureProps) => {
  const { multiple, ...props } = inProps;
  const multipleProps = props as DisclosureMultipleProps;
  const singleProps = props as DisclosureSingleProps;

  return multiple ? (
    <DisclosureMultiple {...multipleProps} />
  ) : (
    <DisclosureSingle {...singleProps} />
  );
};

Disclosure.displayName = 'Disclosure';
Disclosure.Trigger = DisclosureTrigger;
Disclosure.Item = DisclosureItem;
Disclosure.Content = DisclosureContent;
