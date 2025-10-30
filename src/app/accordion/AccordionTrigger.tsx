import { useCallback, useEffect, useRef } from 'react';
import { type PolyProps, cn, Poly, useMergedRefs } from '@ui';
import { useAccordionItemContext } from './accordionItemContext';
import classes from './accordionClasses';

export type AccordionTriggerProps = PolyProps<'button'>;

export const AccordionTrigger = (inProps: AccordionTriggerProps) => {
  const { ref: refProp, className, ...props } = inProps;

  const { triggerId, contentId, open, disabled, onOpenChange } =
    useAccordionItemContext();

  const openRef = useRef(open);

  const ref = useCallback((node: HTMLElement) => {
    function handleClick() {
      const open = openRef.current;
      onOpenChange(!open);
    }

    node.addEventListener('click', handleClick);
    return () => node.removeEventListener('click', handleClick);
  }, []);

  const mergedRefs = useMergedRefs(refProp, ref);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  return (
    <Poly.button
      ref={mergedRefs}
      id={triggerId}
      aria-controls={contentId}
      aria-expanded={open}
      data-state={open ? 'open' : 'closed'}
      data-disabled={disabled ? '' : undefined}
      disabled={disabled}
      className={cn(classes.trigger, className)}
      {...props}
    />
  );
};
