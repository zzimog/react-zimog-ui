import { Native, type NativePropsWithRender } from '@ui/headless';
import { composeHandlers } from '@ui/utils';
import { useDisclosureContext, useDisclosureItemContext } from './context';

const DISPLAY_NAME = 'DisclosureTrigger';

type BaseProps = NativePropsWithRender<'button', { open: boolean }>;
type DisclosureTriggerProps = BaseProps & {
  value?: string;
};

export const DisclosureTrigger = (inProps: DisclosureTriggerProps) => {
  const { value: valueProp, children, onClick, ...props } = inProps;

  const context = useDisclosureContext(DISPLAY_NAME);
  const itemContext = useDisclosureItemContext(DISPLAY_NAME);

  const value = valueProp || itemContext.value || '';
  const open = !!value && context.value.includes(value);

  const child = typeof children === 'function' ? children({ open }) : children;

  return (
    <Native.button
      data-open={open}
      {...props}
      onClick={composeHandlers(onClick, () => {
        if (open) {
          context.onItemClose(value);
        } else {
          context.onItemOpen(value);
        }
      })}
    >
      {child}
    </Native.button>
  );
};

DisclosureTrigger.displayName = DISPLAY_NAME;
