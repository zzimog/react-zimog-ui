import { Native, type NativeProps } from '@ui/headless';
import { composeHandlers } from '@ui/utils';
import { useCollapsibleContext } from './context';

const DISPLAY_NAME = 'CollapsibleTrigger';

type CollapsibleTriggerProps = NativeProps<'button'>;

export const CollapsibleTrigger = (inProps: CollapsibleTriggerProps) => {
  const { onClick, ...props } = inProps;

  const { open, onOpenChange } = useCollapsibleContext(DISPLAY_NAME);

  return (
    <Native.button
      data-open={open}
      {...props}
      onClick={composeHandlers(onClick, () => {
        onOpenChange(!open);
      })}
    />
  );
};

CollapsibleTrigger.displayName = DISPLAY_NAME;
