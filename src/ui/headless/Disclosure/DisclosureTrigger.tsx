import { Native, type NativeProps } from '@ui/headless';
import { composeHandlers } from '@ui/utils';
import { useDisclosureContext, useDisclosureItemContext } from './context';

const DISPLAY_NAME = 'DisclosureTrigger';

type DisclosureTriggerProps = Omit<NativeProps<'button'>, 'value'> & {
  value?: string;
};

export const DisclosureTrigger = (inProps: DisclosureTriggerProps) => {
  const { value: valueProp, onClick, ...props } = inProps;

  const context = useDisclosureContext(DISPLAY_NAME);
  const itemContext = useDisclosureItemContext(DISPLAY_NAME);

  const value = valueProp || itemContext.value;
  const open = !!value && context.value.includes(value);

  return (
    <Native.button
      data-open={open}
      {...props}
      onClick={composeHandlers(onClick, () => {
        if (value) {
          if (open) {
            context.onItemClose(value);
          } else {
            context.onItemOpen(value);
          }
        }
      })}
    />
  );
};

DisclosureTrigger.displayName = DISPLAY_NAME;
