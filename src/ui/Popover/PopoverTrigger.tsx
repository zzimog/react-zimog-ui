import { useCallback } from 'react';
import { useMergedRefs } from '../hooks';
import { type PolyProps, Poly } from '../polymorphic';
import { usePopoverContext } from './popoverContext';

type PopoverTriggerProps = PolyProps<'button'>;

export const PopoverTrigger = (inProps: PopoverTriggerProps) => {
  const { ref: refProp, ...props } = inProps;

  const { triggerRef, contentId, open, setOpen } = usePopoverContext();

  const ref = useCallback((node: HTMLElement) => {
    function handleClick() {
      setOpen((prev) => !prev);
    }

    node.addEventListener('click', handleClick);
    return () => node.removeEventListener('click', handleClick);
  }, []);

  const mergedRefs = useMergedRefs(refProp, triggerRef, ref);

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

PopoverTrigger.displayName = 'PopoverTrigger';
