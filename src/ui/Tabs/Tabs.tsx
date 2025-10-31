import { useId } from 'react';
import { useControllableState } from '../hooks';
import { type PolyProps, Poly } from '../polymorphic';
import { cn } from '../utils';
import classes from './tabsClasses';
import { TabsContent } from './TabsContent';
import { TabsContext } from './tabsContext';
import { TabsList } from './TabsList';
import { TabsTrigger } from './TabsTrigger';

export type TabsProps = PolyProps<'div'> & {
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
    <Poly.div className={cn(classes.root, className)} {...props}>
      <TabsContext value={context}>{children}</TabsContext>
    </Poly.div>
  );
};

Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;
