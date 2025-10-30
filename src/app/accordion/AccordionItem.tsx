import { type PolyProps, cn, Poly } from '@ui';
import { AccordionItemContext } from './accordionItemContext';
import { useId } from 'react';
import { useAccordionContext } from './accordionContext';
import classes from './accordionClasses';

export type AccordionItemProps = PolyProps<'div'> & {
  value: string;
  disabled?: boolean;
};

export const AccordionItem = (inProps: AccordionItemProps) => {
  const { value, disabled, className, children, ...props } = inProps;

  const { baseId, ...context } = useAccordionContext();
  const open = value === context.value;

  const itemId = useId();
  const triggerId = `${baseId}-trigger-${itemId}`;
  const contentId = `${baseId}-content-${itemId}`;

  const itemContext = {
    triggerId,
    contentId,
    open,
    disabled,
    onOpenChange(open: boolean) {
      if (!disabled) {
        if (open) {
          context.onItemOpen(value);
        } else {
          context.onItemClose(value);
        }
      }
    },
  };

  return (
    <Poly.div className={cn(classes.item, className)} {...props}>
      <AccordionItemContext value={itemContext}>
        {children}
      </AccordionItemContext>
    </Poly.div>
  );
};
