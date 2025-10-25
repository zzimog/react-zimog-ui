import { useId, useState } from 'react';
import { type PolyProps, Poly } from '../polymorphic';
import { cn } from '../utils';
import { TabsList } from './TabsList';
import { TabsTrigger } from './TabsTrigger';
import { TabsContent } from './TabsContent';
import { TabsContext } from './tabsContext';
import classes from './tabsClasses';

export type TabsProps = PolyProps<typeof Poly.div> & {
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

export const Tabs = (inProps: TabsProps) => {
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
    <Poly.div className={cn(classes.root, className)} {...props}>
      <TabsContext value={context}>{children}</TabsContext>
    </Poly.div>
  );
};

Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;
