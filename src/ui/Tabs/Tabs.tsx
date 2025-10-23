import { useId, useState } from 'react';
import { poly } from '../polymorphic';
import { cn } from '../utils';
import { TabsList } from './TabsList';
import { TabsTrigger } from './TabsTrigger';
import { TabsContent } from './TabsContent';
import { TabsContext } from './tabsContext';
import classes from './tabsClasses';

type TabsProps = {
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

const TabsRoot = poly.div<TabsProps>((Tag, inProps) => {
  const { id, defaultValue, className, children, onValueChange, ...props } =
    inProps;

  const uniqueId = useId();
  const baseId = id ?? uniqueId;

  const [value, setValue] = useState(defaultValue || undefined);

  const context = {
    baseId,
    value,
    setValue(value: string) {
      onValueChange?.(value);
      setValue(value);
    },
  };

  return (
    <Tag className={cn(classes.root, className)} {...props}>
      <TabsContext value={context}>{children}</TabsContext>
    </Tag>
  );
});

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});

export type { TabsProps };
