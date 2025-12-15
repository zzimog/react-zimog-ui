import { useContext } from 'react';
import { type PolyProps, Poly } from '../polymorphic';
import { composeHandlers } from '../utils';
import { useDisclosureContext } from './disclosureContext';
import { DisclosureItemContext } from './disclosureItemContext';

const DISPLAY_NAME = 'DisclosureTrigger';

type DisclosureTriggerProps = Omit<PolyProps<'button'>, 'value'> & {
  value?: string;
};

export const DisclosureTrigger = (inProps: DisclosureTriggerProps) => {
  const { value: valueProp, onClick, ...props } = inProps;

  const context = useDisclosureContext(DISPLAY_NAME);
  const itemContext = useContext(DisclosureItemContext);

  const value = valueProp || itemContext?.value;
  const open = !!value && context.value.includes(value);

  return (
    <Poly.button
      data-open={open}
      onClick={composeHandlers(onClick, () => {
        if (value) {
          if (open) {
            context.onItemClose(value);
          } else {
            context.onItemOpen(value);
          }
        }
      })}
      {...props}
    />
  );
};

DisclosureTrigger.displayName = DISPLAY_NAME;
