import { type PolyProps, Poly, useMergedRefs } from '@ui';
import { useAccordionItemContext } from './accordionItemContext';
import { useCallback } from 'react';

export type AccordionTriggerProps = PolyProps<'button'>;

export const AccordionTrigger = (inProps: AccordionTriggerProps) => {
  const { ref: refProp, ...props } = inProps;

  const { triggerId, contentId, open, disabled, onOpenChange } =
    useAccordionItemContext();

  const ref = useCallback((node: HTMLElement) => {
    function handleClick() {
      onOpenChange(!open);
    }

    node.addEventListener('click', handleClick);
    return () => node.removeEventListener('click', handleClick);
  }, [open]);

  const mergedRefs = useMergedRefs(refProp, ref);

  return (
    <Poly.button
      ref={mergedRefs}
      id={triggerId}
      aria-controls={contentId}
      aria-expanded={open}
      data-state={open ? 'open' : 'closed'}
      data-disabled={disabled ? '' : undefined}
      disabled={disabled}
      {...props}
    />
  );
};
