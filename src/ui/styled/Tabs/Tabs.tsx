import type { ComponentProps } from 'react';
import { Disclosure, Native, type NativeProps } from '@ui/headless';
import { cn } from '@ui/utils';
import classes from './classes';

type TabsProps = ComponentProps<typeof Disclosure>;

export const Tabs = (inProps: TabsProps) => {
  const { className, ...props } = inProps;

  return <Disclosure className={cn(classes.root, className)} {...props} />;
};

Tabs.displayName = 'Tabs';

/*---------------------------------------------------------------------------*/

type TabsListProps = NativeProps<'div'>;

const TabsList = (inProps: TabsListProps) => {
  const { className, ...props } = inProps;

  return <Native.div className={cn(classes.list, className)} {...props} />;
};

TabsList.displayName = 'TabsList';
Tabs.List = TabsList;

/*---------------------------------------------------------------------------*/

type BaseTriggerProps = ComponentProps<typeof Disclosure.Trigger>;
type TabsTriggerProps = BaseTriggerProps & {
  value: string;
};

const TabsTrigger = (inProps: TabsTriggerProps) => {
  const { value, className, ...props } = inProps;

  return (
    <Disclosure.Trigger
      value={value}
      className={cn(classes.trigger, className)}
      {...props}
    />
  );
};

TabsTrigger.displayName = 'TabsTrigger';
Tabs.Trigger = TabsTrigger;

/*---------------------------------------------------------------------------*/

type BaseProps = ComponentProps<typeof Disclosure.Content>;
type TabsContentProps = BaseProps & {
  value: string;
};

export const TabsContent = (inProps: TabsContentProps) => {
  const { value, className, ...props } = inProps;

  return (
    <Disclosure.Content
      value={value}
      className={cn(classes.content, className)}
      {...props}
    />
  );
};

TabsContent.displayName = 'TabsContent';
Tabs.Content = TabsContent;
