import { type ElementType, type HTMLAttributes, useRef } from 'react';
import { cn } from '../utils';
import classes from './tabsClasses';
import { useTabsContext } from './tabsContext';
import { NodeGroup } from '../NodeGroup';

export type TabsTriggerProps = {
  as?: ElementType;
  index?: number;
  value: string;
  disabled?: boolean;
} & HTMLAttributes<HTMLElement>;

export const TabsTrigger = (inProps: TabsTriggerProps) => {
  const {
    as: Tag = 'button',
    value: valueProp,
    disabled,
    className,
    ...props
  } = inProps;

  const ref = useRef<HTMLElement>(null);

  const { baseId, value, setValue } = useTabsContext();

  const triggerId = `${baseId}-trigger-${value}`;
  const itemId = `${baseId}-item-${value}`;

  const isActive = valueProp === value;

  function handleClick() {
    if (!isActive && !disabled) {
      setValue(valueProp);
    }
  }

  return (
    <NodeGroup.Item selected={isActive}>
      <Tag
        ref={ref}
        id={triggerId}
        role="tab"
        aria-controls={itemId}
        aria-selected={isActive}
        data-selected={isActive}
        disabled={disabled}
        className={cn(classes.trigger, className)}
        onClick={() => handleClick()}
        {...props}
      />
    </NodeGroup.Item>
  );
};
