import { useCallback, useRef, useEffect } from 'react';
import { useMergedRefs } from '../hooks';
import { type PolyProps, Poly } from '../polymorphic';
import { usePopoverContext } from './popoverContext';

export type PopoverTriggerProps = PolyProps<typeof Poly.button>;

export const PopoverTrigger = (inProps: PopoverTriggerProps) => {
  const { ref: refProp, ...props } = inProps;

  const { triggerRef, contentId, open, setOpen } = usePopoverContext();

  const ref = useCallback((node: HTMLElement) => {
    function handleClick() {
      const open = prevOpenRef.current;
      setOpen(!open);
    }

    node.addEventListener('click', handleClick);
    return () => node.removeEventListener('click', handleClick);
  }, []);

  const mergedRefs = useMergedRefs(refProp, triggerRef, ref);

  const prevOpenRef = useRef(open);
  useEffect(() => {
    prevOpenRef.current = open;
  }, [open]);

  return (
    <Poly.button
      data-open={open}
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-controls={contentId}
      ref={mergedRefs}
      {...props}
    />
  );
};
