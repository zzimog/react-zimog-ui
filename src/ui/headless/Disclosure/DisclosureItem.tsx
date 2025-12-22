import { Native, type NativeProps } from '@ui/headless';
import { DisclosureItemContext, useDisclosureContext } from './context';

const DISPLAY_NAME = 'DisclosureItem';

type DisclosureItemProps = NativeProps<'div'> & {
  value: string;
};

export const DisclosureItem = (inProps: DisclosureItemProps) => {
  const { value, children, ...props } = inProps;
  const contextProps = { value, children };

  const context = useDisclosureContext(DISPLAY_NAME);
  const open = context.value.includes(value);

  return (
    <Native.div data-open={open} {...props}>
      <DisclosureItemContext {...contextProps} />
    </Native.div>
  );
};

DisclosureItem.displayName = DISPLAY_NAME;
