import { Native, type NativeProps } from '@ui/headless';
import { useControllableState } from '@ui/hooks';
import { createScopedContext } from '@ui/utils';
import { TabsContent } from './TabsContent';
import { TabsList } from './TabsList';
import { TabsTrigger } from './TabsTrigger';

const DISPLAY_NAME = 'Tabs';

type TabsContextValue = {
  value: string;
  onValueChange(value: string): void;
};

const [TabsContext, useTabsContext] = createScopedContext<
  TabsContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type TabsProps = NativeProps<'div'> & {
  defaultValue?: string;
  value?: string;
  onValueChange?(value: string): void;
};

export const Tabs = (inProps: TabsProps) => {
  const {
    defaultValue = '',
    value: valueProp,
    children,
    onValueChange,
    ...props
  } = inProps;

  const [value, setValue] = useControllableState({
    defaultProp: defaultValue,
    prop: valueProp,
    onChange: onValueChange,
  });

  return (
    <Native.div {...props}>
      <TabsContext value={value} onValueChange={setValue}>
        {children}
      </TabsContext>
    </Native.div>
  );
};

Tabs.displayName = DISPLAY_NAME;
Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;
Tabs.useContext = useTabsContext;
