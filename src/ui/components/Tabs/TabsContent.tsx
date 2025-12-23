import { Native, type NativeProps } from '@ui/headless';
import { Tabs } from './Tabs';

const DISPLAY_NAME = 'TabsContent';

type TabsContentProps = NativeProps<'div'> & {
  value: string;
};

export const TabsContent = (inProps: TabsContentProps) => {
  const { value, ...props } = inProps;

  const context = Tabs.useContext(DISPLAY_NAME);
  const selected = value === context.value;

  return selected && <Native.div data-selected={selected} {...props} />;
};

TabsContent.displayName = DISPLAY_NAME;
