import { useContext, type ReactElement } from 'react';
import { type PolyProps } from '../polymorphic';
import { useDisclosureContext } from './disclosureContext';
import { DisclosureItemContext } from './disclosureItemContext';
import { Presence } from '../Presence';

const DISPLAY_NAME = 'DisclosureContent';

type PresenceProps = Omit<PolyProps<typeof Presence>, 'present'>;
type DisclosureContentProps = Omit<PresenceProps, 'children'> & {
  value?: string;
  children?: ReactElement | ((props: { open: boolean }) => ReactElement);
};

export const DisclosureContent = (inProps: DisclosureContentProps) => {
  const { value: valueProp, children, ...props } = inProps;

  const context = useDisclosureContext(DISPLAY_NAME);
  const itemContext = useContext(DisclosureItemContext);

  const value = valueProp || itemContext?.value;
  const open = !!value && context.value.includes(value);

  if (typeof children === 'function') {
    return children({ open });
  }

  return (
    <Presence present={open} {...props}>
      {children}
    </Presence>
  );
};

DisclosureContent.displayName = DISPLAY_NAME;
