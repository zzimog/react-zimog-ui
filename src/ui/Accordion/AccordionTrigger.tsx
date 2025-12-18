import { ChevronDown } from 'lucide-react';
import { type NativeProps, Native } from '../Native';
import { cn, composeHandlers } from '../utils';
import classes from './accordionClasses';
import { useAccordionItemContext } from './accordionItemContext';

export type AccordionTriggerProps = NativeProps<'button'>;

export const AccordionTrigger = (inProps: AccordionTriggerProps) => {
  const { className, onClick, children, ...props } = inProps;

  const { triggerId, contentId, open, disabled, onOpenChange } =
    useAccordionItemContext();

  function handleClick() {
    onOpenChange(!open);
  }

  return (
    <Native.button
      id={triggerId}
      aria-controls={contentId}
      aria-expanded={open}
      data-state={undefined}
      data-expanded={open}
      data-disabled={disabled ? '' : undefined}
      disabled={disabled}
      className={cn(classes.trigger, className)}
      onClick={composeHandlers(onClick, handleClick, true)}
      {...props}
    >
      {children}
      <ChevronDown className={classes.arrow} />
    </Native.button>
  );
};
