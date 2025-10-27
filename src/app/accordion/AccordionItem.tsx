import { type PolyProps, Poly } from '@ui';
import { AccordionItemContext } from './accordionItemContext';
import { useId } from 'react';
import { useAccordionContext } from './accordionContext';

export type AccordionItemProps = PolyProps<'div'> & {
  value: string;
  disabled?: boolean;
};

export const AccordionItem = (inProps: AccordionItemProps) => {
  const { value: valueProp, disabled, children, ...props } = inProps;

  const { baseId, value, onValueChange } = useAccordionContext();

  const itemId = useId();
  const triggerId = `${baseId}-trigger-${itemId}`;
  const contentId = `${baseId}-content-${itemId}`;

  const open = value === valueProp;

  const context = {
    triggerId,
    contentId,
    open,
    disabled,
    onOpenChange() {
      if (!disabled) {
        onValueChange(value);
      }
    },
  };

  return (
    <Poly.div {...props}>
      <AccordionItemContext value={context}>{children}</AccordionItemContext>
    </Poly.div>
  );
};
