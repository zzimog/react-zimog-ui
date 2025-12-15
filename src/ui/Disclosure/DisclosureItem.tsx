import { type PolyProps, Poly } from '../polymorphic';
import { DisclosureItemContext } from './disclosureItemContext';

type DisclosureItemProps = PolyProps<'div'> & {
  value: string;
};

export const DisclosureItem = (inProps: DisclosureItemProps) => {
  const { value, children, ...props } = inProps;

  return (
    <Poly.div {...props}>
      <DisclosureItemContext value={{ value }}>
        {children}
      </DisclosureItemContext>
    </Poly.div>
  );
};

DisclosureItem.displayName = 'DisclosureItem';
