import { Fragment } from 'react';
import { type NativeProps, Native } from '../Native';
import { DisclosureItemContext } from './disclosureItemContext';

type DisclosureItemProps = NativeProps<'div'> & {
  value: string;
};

export const DisclosureItem = (inProps: DisclosureItemProps) => {
  const { value, children, ...props } = inProps;

  return (
    <Native.div as={Fragment} {...props}>
      <DisclosureItemContext value={{ value }}>
        {children}
      </DisclosureItemContext>
    </Native.div>
  );
};

DisclosureItem.displayName = 'DisclosureItem';
