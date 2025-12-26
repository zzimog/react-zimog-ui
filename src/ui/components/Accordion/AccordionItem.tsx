import { Native, type NativeProps } from '@ui/headless';
import { createScopedContext } from '@ui/utils';
import { Accordion } from './Accordion';

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
  const { value, children, ...props } = inProps;

  const context = Accordion.useContext(DISPLAY_NAME);
  const open = context.value.includes(value);

  return (
    <Native.div data-open={open} {...props}>
      <AccordionItemContext
        open={open}
        onOpenChange={(open) => {
          if (open) {
            context.onItemOpen(value);
          } else {
            context.onItemClose(value);
          }
        }}
      >
        {children}
      </AccordionItemContext>
    </Native.div>
  );
};

AccordionItem.displayName = DISPLAY_NAME;
AccordionItem.useContext = useAccordionItemContext;
