import {
  type ElementType,
  type Ref,
  type HTMLAttributes,
  useState,
  Children,
  useId,
} from 'react';
import { cn } from '../utils';
import { TabsList } from './TabsList';
import { TabsTab } from './TabsTab';
import { TabsItem } from './TabsItem';
import classes from './tabsClasses';
import { TabsContext } from './tabsContext';

export type TabsProps = {
  as?: ElementType;
  ref?: Ref<HTMLElement>;
  value?: number;
  defaultValue?: number;
  onChange?(value: number): void;
} & HTMLAttributes<HTMLElement>;

export const Tabs = (inProps: TabsProps) => {
  const {
    as: Tag = 'div',
    value: propValue,
    defaultValue,
    className,
    children,
    onChange,
    ...props
  } = inProps;

  const computedValue = propValue || defaultValue || undefined;

  const baseId = useId();

  const [value, setValue] = useState(computedValue);

  const context = {
    baseId,
    value,
    setValue(index: number) {
      onChange?.(index);
      setValue(index);
    },
  };

  return (
    <Tag className={cn(classes.root, className)} {...props}>
      {Children.map(children, (child, index) => (
        <TabsContext value={{ index, ...context }}>{child}</TabsContext>
      ))}
    </Tag>
  );
};

Tabs.List = TabsList;
Tabs.Tab = TabsTab;
Tabs.Item = TabsItem;
