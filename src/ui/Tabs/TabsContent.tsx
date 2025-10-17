import { type ElementType, type HTMLAttributes } from 'react';
import { cn } from '../utils';
import classes from './tabsClasses';
import { useTabsContext } from './tabsContext';

export type TabsContentProps = {
  as?: ElementType;
  value: string;
} & HTMLAttributes<HTMLElement>;

export const TabsContent = (inProps: TabsContentProps) => {
  const {
    as: Tag = 'div',
    value: valueProp,
    className,
    children,
    ...props
  } = inProps;

  const { baseId, value } = useTabsContext();

  const triggerId = `${baseId}-trigger-${valueProp}`;
  const itemId = `${baseId}-item-${valueProp}`;

  const isActive = value === valueProp;

  return (
    <Tag
      id={itemId}
      role="tabpanel"
      aria-labelledby={triggerId}
      hidden={!isActive}
      className={cn(classes.content, className)}
      {...props}
    >
      {isActive && children}
    </Tag>
  );
};
