import { useMergedRefs } from '../hooks';
import { type PolyProps, Poly } from '../polymorphic';
import { usePopoverContext } from './popoverContext';
import { composeHandlers } from '../utils';

type PopoverTriggerProps = PolyProps<'button'>;

export const PopoverTrigger = (inProps: PopoverTriggerProps) => {
  const { ref, onClick, ...props } = inProps;

  const { triggerRef, contentId, open, setOpen } = usePopoverContext();

  const mergedRefs = useMergedRefs(ref, triggerRef);

  const handleClick = composeHandlers(onClick, () => {
    setOpen(!open);
  });

  return (
    <Poly.button
      ref={mergedRefs}
      data-open={open}
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-controls={contentId}
      onClick={handleClick}
      {...props}
    />
  );
};

PopoverTrigger.displayName = 'PopoverTrigger';
