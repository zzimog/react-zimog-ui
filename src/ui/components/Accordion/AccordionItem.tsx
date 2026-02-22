import { useCallback } from 'react';
import { Native, type NativeProps } from '@ui/headless';
import { cn, createScopedContext } from '@ui/utils';
import { Accordion } from './Accordion';
import classes from './classes';

const DISPLAY_NAME = 'AccordionItem';

type AccordionItemContextValue = {
  open: boolean;
  onOpenChange(open: boolean): void;
};

const [AccordionItemContext, useAccordionItemContext] = createScopedContext<
  AccordionItemContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type AccordionItemProps = NativeProps<'div'> & {
  value: string;
};

export const AccordionItem = (inProps: AccordionItemProps) => {
  const { value, className, ...props } = inProps;

  const context = Accordion.useContext(DISPLAY_NAME);
  const isOpen = context.value.includes(value);

  const handleOpenChange = useCallback((open: boolean) => {
    if (open) {
      context.onItemOpen(value);
    } else {
      context.onItemClose(value);
    }
  }, []);

  return (
    <AccordionItemContext open={isOpen} onOpenChange={handleOpenChange}>
      <Native.div
        data-open={isOpen}
        {...props}
        className={cn(classes.item, className)}
      />
    </AccordionItemContext>
  );
};

AccordionItem.displayName = DISPLAY_NAME;
AccordionItem.useContext = useAccordionItemContext;
