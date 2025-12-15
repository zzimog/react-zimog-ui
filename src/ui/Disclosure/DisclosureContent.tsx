import { useContext } from 'react';
import { type PolyProps, Poly } from '../polymorphic';
import { useDisclosureContext } from './disclosureContext';
import { DisclosureItemContext } from './disclosureItemContext';

const DISPLAY_NAME = 'DisclosureContent';

type DisclosureContentProps = PolyProps<'div'> & {
  value?: string;
};

export const DisclosureContent = (inProps: DisclosureContentProps) => {
  const { value: valueProp, ...props } = inProps;

  const context = useDisclosureContext(DISPLAY_NAME);
  const itemContext = useContext(DisclosureItemContext);

  const value = valueProp || itemContext?.value;
  const open = !!value && context.value.includes(value);

  return open && <Poly.div {...props} />;
};

DisclosureContent.displayName = DISPLAY_NAME;
