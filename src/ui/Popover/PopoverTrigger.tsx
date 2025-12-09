import { useMergedRefs } from '../hooks';
import { type PolyProps, Poly } from '../polymorphic';
import { usePopoverContext } from './popoverContext';
import { composeHandlers } from '../utils';

const DISPLAY_NAME = 'PopoverTrigger';

type PopoverTriggerProps = PolyProps<'button'>;

export const PopoverTrigger = (inProps: PopoverTriggerProps) => {
  const { ref, onClick, ...props } = inProps;

  const context = usePopoverContext(DISPLAY_NAME);
  const { triggerRef, contentId, open, onOpenChange } = context;

  const mergedRefs = useMergedRefs(ref, triggerRef);

  return (
    <Poly.button
      ref={mergedRefs}
      type="button"
      role={inProps.as !== 'button' ? 'button' : undefined}
      data-open={open}
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-controls={contentId}
      onClick={composeHandlers(onClick, () => {
        onOpenChange(!open);
      })}
      {...props}
    />
  );
};

PopoverTrigger.displayName = DISPLAY_NAME;
