import { type PolyProps, cn, Poly } from '@ui';
import { useAccordionItemContext } from './accordionItemContext';
import classes from './accordionClasses';

export type AccordionTriggerProps = PolyProps<'button'>;

type EventHandler<E> = (event: E) => void;
function useMergedHandler<E extends { defaultPrevented: boolean }>(
  propHandler: EventHandler<E> | undefined,
  customHandler: EventHandler<E>,
  checkPrevented: boolean = false
) {
  return (event: E) => {
    propHandler?.(event);

    if (!checkPrevented || event.defaultPrevented) {
      customHandler(event);
    }
  };
}

export const AccordionTrigger = (inProps: AccordionTriggerProps) => {
  const { className, onClick, ...props } = inProps;

  const { triggerId, contentId, open, disabled, onOpenChange } =
    useAccordionItemContext();

  const handleClick = useMergedHandler(
    onClick,
    () => onOpenChange(!open),
    true
  );

  return (
    <Poly.button
      id={triggerId}
      aria-controls={contentId}
      aria-expanded={open}
      data-state={open ? 'open' : 'closed'}
      data-disabled={disabled ? '' : undefined}
      disabled={disabled}
      className={cn(classes.trigger, className)}
      onClick={handleClick}
      {...props}
    />
  );
};
