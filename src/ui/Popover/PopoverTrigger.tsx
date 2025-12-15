import { useMergedRefs } from '../hooks';
import { type PolyProps, Poly } from '../polymorphic';
import { usePopoverContext } from './popoverContext';
import { composeHandlers } from '../utils';

const DISPLAY_NAME = 'PopoverTrigger';

type PopoverTriggerProps = PolyProps<'button'>;

export const PopoverTrigger = (inProps: PopoverTriggerProps) => {
  const { ref, onClick, ...props } = inProps;

  const context = usePopoverContext(DISPLAY_NAME);
  const { setTrigger, contentId, open, setOpen } = context;

  const mergedRefs = useMergedRefs(ref, setTrigger);

  return (
    <Poly.button
      ref={mergedRefs}
      type="button"
      data-open={open}
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-controls={contentId}
      onClick={composeHandlers(onClick, () => {
        setOpen(!open);
      })}
      {...props}
    />
  );
};

PopoverTrigger.displayName = DISPLAY_NAME;
