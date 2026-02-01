import { Native, type NativeProps } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';
import { composeHandlers } from '@ui/utils';
import { Popover } from './Popover';

const DISPLAY_NAME = 'PopoverTrigger';

type PopoverTriggerProps = NativeProps<'button'>;

export const PopoverTrigger = (inProps: PopoverTriggerProps) => {
  const { ref: refProp, onClick, ...props } = inProps;

  const context = Popover.useContext(DISPLAY_NAME);

  const ref = useMergedRefs(refProp, context.onTriggerChange);

  return (
    <Native.button
      ref={ref}
      type="button"
      data-open={context.open}
      aria-haspopup="dialog"
      aria-expanded={context.open}
      aria-controls={context.contentId}
      onClick={composeHandlers(onClick, () => {
        context.onOpenChange(!context.open);
      })}
      {...props}
    />
  );
};

PopoverTrigger.displayName = DISPLAY_NAME;
