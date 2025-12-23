import { Highlight, Native, type NativeProps } from '@ui/headless';
import { cn, composeHandlers } from '@ui/utils';
import { Tabs } from './Tabs';
import { TabsList } from './TabsList';
import classes from './classes';

const DISPLAY_NAME = 'TabsTrigger';

type TabsTriggerProps = NativeProps<'button'> & {
  value: string;
};

export const TabsTrigger = (inProps: TabsTriggerProps) => {
  const { value: valueProp, className, onClick, ...props } = inProps;

  const { value, onValueChange } = Tabs.useContext(DISPLAY_NAME);
  const selected = valueProp === value;

  TabsList.useContext(DISPLAY_NAME);

  return (
    <Highlight.Item asChild selected={selected}>
      <Native.button
        data-selected={selected}
        {...props}
        className={cn(classes.trigger, className)}
        onClick={composeHandlers(onClick, () => {
          onValueChange(valueProp);
        })}
      />
    </Highlight.Item>
  );
};

TabsTrigger.displayName = DISPLAY_NAME;
