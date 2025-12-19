import { useId } from 'react';
import { type NativeProps, Native } from '../Native';
import { cn } from '../utils';
import classes from './accordionClasses';
import { useAccordionContext } from './accordionContext';
import { AccordionItemContext } from './accordionItemContext';

export type AccordionItemProps = NativeProps<'div'> & {
  value: string;
  disabled?: boolean;
};

export const AccordionItem = (inProps: AccordionItemProps) => {
  const { value, disabled = false, className, children, ...props } = inProps;

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
    <Native.div className={cn(classes.item, className)} {...props}>
      <AccordionItemContext value={itemContext}>
        {children}
      </AccordionItemContext>
    </Native.div>
  );
};
