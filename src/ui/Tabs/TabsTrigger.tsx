import { type MouseEvent } from 'react';
import { poly } from '../polymorphic';
import { cn } from '../utils';
import classes from './tabsClasses';
import { useTabsContext } from './tabsContext';
import { HighlightItem } from '../Highlight';

export type TabsTriggerProps = {
  value: string;
  disabled?: boolean;
};

export const TabsTrigger = poly.button<TabsTriggerProps>((Tag, inProps) => {
  const { value: valueProp, disabled, className, onClick, ...props } = inProps;

  const { baseId, value, setValue } = useTabsContext();

  const triggerId = `${baseId}-trigger-${value}`;
  const itemId = `${baseId}-item-${value}`;

  const isActive = valueProp === value;

  function handleClick(event: MouseEvent<HTMLElement>) {
    if (!disabled) {
      setValue(valueProp);
    }

    onClick?.(event);
  }

  return (
    <HighlightItem
      as={Tag}
      id={triggerId}
      role="tab"
      aria-controls={itemId}
      aria-selected={isActive}
      data-selected={isActive}
      disabled={disabled}
      className={cn(classes.trigger, className)}
      selected={isActive}
      onClick={handleClick}
      {...props}
    />
  );
});
