import { type ElementType, type HTMLAttributes, useId, useState } from 'react';
import { cn } from '../utils';
import { TabsList } from './TabsList';
import { TabsTrigger } from './TabsTrigger';
import { TabsContent } from './TabsContent';
import { TabsContext } from './tabsContext';
import classes from './tabsClasses';

export type TabsProps = {
  as?: ElementType;
  defaultValue?: string;
  onChange?(value: string): void;
} & HTMLAttributes<HTMLElement>;

export const Tabs = (inProps: TabsProps) => {
  const {
    as: Tag = 'div',
    id,
    defaultValue,
    className,
    children,
    onChange,
    ...props
  } = inProps;

  const uniqueId = useId();
  const baseId = id ?? uniqueId;

  const [value, setValue] = useState(defaultValue || undefined);

  const context = {
    baseId,
    value,
    setValue(value: string) {
      onChange?.(value);
      setValue(value);
    },
  };

  return (
    <Tag className={cn(classes.root, className)} {...props}>
      <TabsContext value={context}>{children}</TabsContext>
    </Tag>
  );
};

Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;
