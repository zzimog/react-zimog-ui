import { useCallback } from 'react';
import { Poly, type PolyProps } from '../polymorphic';
import { useAccordionContext } from './accordionContext';
import { useMergedRefs } from '../hooks';

export type AccordionTriggerProps = PolyProps<'button'>;

export const AccordionTrigger = (inProps: AccordionTriggerProps) => {
  const { ref: refProp, ...props } = inProps;

  const { value, setValue } = useAccordionContext();

  const ref = useCallback((node: HTMLElement) => {
    function handleClick() {
      setValue(value);
    }
  }, []);

  const mergedRefs = useMergedRefs(refProp, ref);

  return <Poly.button ref={mergedRefs} {...props} />;
};
