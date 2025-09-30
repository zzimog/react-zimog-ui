import {
  type ElementType,
  type Ref,
  type HTMLAttributes,
  Children,
  isValidElement,
  useState,
} from 'react';
import { Button } from '../Button';
import { TabsItem, type TabsItemProps } from './TabsItem';

export type TabsProps = {
  as?: ElementType;
  ref?: Ref<HTMLElement>;
  value?: number;
  onChange?(value: number): void;
} & HTMLAttributes<HTMLElement>;

export const Tabs = (inProps: TabsProps) => {
  const {
    as: Tag = 'div',
    value: propValue,
    onChange,
    children,
    ...props
  } = inProps;

  const [value, setValue] = useState(propValue || 0);

  const validChildren = Children.toArray(children)
    .filter((child) => isValidElement(child))
    .filter((child) => Object.hasOwn(child.props as object, 'title'));

  const titles = validChildren.map((child) => {
    const props = child.props as TabsItemProps;
    return props.title;
  });

  function handleTabChange(index: number) {
    onChange?.(index);
    setValue(index);
  }

  return (
    <Tag className="flex flex-col gap-2" {...props}>
      <header role="tabslist" className="flex gap-2">
        {titles.map((title, index) => (
          <Button key={index} size="sm" onClick={() => handleTabChange(index)}>
            {title}
          </Button>
        ))}
      </header>
      {validChildren[value]}
    </Tag>
  );
};

Tabs.Item = TabsItem;
