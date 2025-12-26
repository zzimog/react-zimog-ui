import type { PropsWithChildren } from 'react';
import { Native, type NativeProps } from '@ui/headless';
import { useControllableState } from '@ui/hooks';
import { createScopedContext } from '@ui/utils';
import { AccordionContent } from './AccordionContent';
import { AccordionItem } from './AccordionItem';
import { AccordionTrigger } from './AccordionTrigger';

const DISPLAY_NAME = 'Accordion';

type AccordionContextValue = {
  value: string[];
  onItemOpen(value: string): void;
  onItemClose(value: string): void;
};

const [AccordionContext, useAccordionContext] = createScopedContext<
  AccordionContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type AccordionSingleProps = PropsWithChildren<{
  multiple?: false;
  value?: string;
  defaultValue?: string;
  onValueChange?(value: string): void;
}>;

const AccordionSingle = (inProps: AccordionSingleProps) => {
  const {
    defaultValue = '',
    value: valueProp,
    children,
    onValueChange,
  } = inProps;

  const [value, setValue] = useControllableState({
    defaultProp: defaultValue,
    prop: valueProp,
    onChange: onValueChange,
  });

  return (
    <AccordionContext
      value={value ? [value] : []}
      onItemOpen={setValue}
      onItemClose={() => setValue('')}
    >
      {children}
    </AccordionContext>
  );
};

/*---------------------------------------------------------------------------*/

type AccordionMultipleProps = PropsWithChildren<{
  multiple: true;
  value?: string[];
  defaultValue?: string[];
  onValueChange?(value: string[]): void;
}>;

const AccordionMultiple = (inProps: AccordionMultipleProps) => {
  const {
    defaultValue = [],
    value: valueProp,
    onValueChange,
    children,
  } = inProps;

  const [value, setValue] = useControllableState({
    defaultProp: defaultValue,
    prop: valueProp,
    onChange: onValueChange,
  });

  return (
    <AccordionContext
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
    </AccordionContext>
  );
};

/*---------------------------------------------------------------------------*/

type AccordionProps = NativeProps<'div'> &
  (AccordionMultipleProps | AccordionSingleProps);

export const Accordion = (inProps: AccordionProps) => {
  const { multiple, value, defaultValue, children, onValueChange, ...props } =
    inProps;

  const AccordionProps = {
    multiple,
    value,
    defaultValue,
    children,
    onValueChange,
  };

  return (
    <Native.div {...props}>
      {multiple ? (
        <AccordionMultiple {...(AccordionProps as AccordionMultipleProps)} />
      ) : (
        <AccordionSingle {...(AccordionProps as AccordionSingleProps)} />
      )}
    </Native.div>
  );
};

Accordion.displayName = DISPLAY_NAME;
Accordion.Trigger = AccordionTrigger;
Accordion.Item = AccordionItem;
Accordion.Content = AccordionContent;
Accordion.useContext = useAccordionContext;
