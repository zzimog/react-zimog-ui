import { useId } from 'react';
import { useControllableState } from '../hooks';
import { type NativeProps, Native } from '../Native';
import { cn } from '../utils';
import classes from './tabsClasses';
import { TabsContent } from './TabsContent';
import { TabsContext } from './tabsContext';
import { TabsList } from './TabsList';
import { TabsTrigger } from './TabsTrigger';

export type TabsProps = NativeProps<'div'> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

export const Tabs = (inProps: TabsProps) => {
  const {
    id,
    value: valueProp,
    defaultValue = '',
    className,
    children,
    onValueChange,
    ...props
  } = inProps;

  const uniqueId = useId();
  const baseId = id ?? uniqueId;

  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultValue,
    onChange: onValueChange,
  });

  const context = {
    baseId,
    value,
    onValueChange(value: string) {
      setValue(value);
    },
  };

  return (
    <Native.div className={cn(classes.root, className)} {...props}>
      <TabsContext value={context}>{children}</TabsContext>
    </Native.div>
  );
};

Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;
