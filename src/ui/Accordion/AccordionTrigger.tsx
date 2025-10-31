import { Highlight } from '../Highlight';
import { type PolyProps, Poly } from '../polymorphic';
import { cn, composeHandlers } from '../utils';
import classes from './accordionClasses';
import { useAccordionItemContext } from './accordionItemContext';

export type AccordionTriggerProps = PolyProps<'button'>;

export const AccordionTrigger = (inProps: AccordionTriggerProps) => {
  const { className, onClick, ...props } = inProps;

  const { triggerId, contentId, open, disabled, onOpenChange } =
    useAccordionItemContext();

  function handleClick() {
    onOpenChange(!open);
  }

  return (
    <Highlight.Item disabled={disabled} asChild>
      <Poly.button
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
      />
    </Highlight.Item>
  );
};
