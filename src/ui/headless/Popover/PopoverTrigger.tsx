import { Native, type NativeProps } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';
import { composeHandlers } from '@ui/utils';
import { usePopoverContext } from './context';

const DISPLAY_NAME = 'PopoverTrigger';

type PopoverTriggerProps = NativeProps<'button'>;

export const PopoverTrigger = (inProps: PopoverTriggerProps) => {
  const { ref, onClick, ...props } = inProps;

  const context = usePopoverContext(DISPLAY_NAME);
  const { setTrigger, contentId, open, setOpen } = context;

  const mergedRefs = useMergedRefs(ref, setTrigger);

  return (
    <Native.button
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
