import type { ComponentProps } from 'react';
import { Disclosure, Highlight, type NativeProps } from '@ui/headless';
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
  const { className, children, ...props } = inProps;

  return (
    <Highlight className={cn(classes.list, className)} {...props}>
      <Highlight.Indicator className={classes.highlight} />
      {children}
    </Highlight>
  );
};

TabsList.displayName = 'TabsList';
Tabs.List = TabsList;

/*---------------------------------------------------------------------------*/

type TriggerBaseProps = NativeProps<'button'>;
type TabsTriggerProps = TriggerBaseProps & {
  value: string;
};

const TabsTrigger = (inProps: TabsTriggerProps) => {
  const { value, className, children, ...props } = inProps;

  return (
    <Disclosure.Trigger
      asChild
      value={value}
      className={cn(classes.trigger, className)}
      {...props}
    >
      {({ open }) => (
        <Highlight.Item selected={open}>{children}</Highlight.Item>
      )}
    </Disclosure.Trigger>
  );
};

TabsTrigger.displayName = 'TabsTrigger';
Tabs.Trigger = TabsTrigger;

/*---------------------------------------------------------------------------*/

type ContentBaseProps = ComponentProps<typeof Disclosure.Content>;
type TabsContentProps = ContentBaseProps & {
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
