import { ChevronDown } from 'lucide-react';
import { Native, type NativeProps } from '@ui/headless';
import { cn, composeHandlers } from '@ui/utils';
import { AccordionItem } from './AccordionItem';
import classes from './classes';

const DISPLAY_NAME = 'AccordionTrigger';

type AccordionTriggerProps = NativeProps<'button'> & {
  value?: string;
};

export const AccordionTrigger = (inProps: AccordionTriggerProps) => {
  const { value: valueProp, className, children, onClick, ...props } = inProps;

  const { open, onOpenChange } = AccordionItem.useContext(DISPLAY_NAME);

  return (
    <Native.button
      data-open={open}
      {...props}
      className={cn(classes.trigger, className)}
      onClick={composeHandlers(onClick, () => {
        onOpenChange(!open);
      })}
    >
      {children}
      <ChevronDown className={classes.arrow} />
    </Native.button>
  );
};

AccordionTrigger.displayName = DISPLAY_NAME;
