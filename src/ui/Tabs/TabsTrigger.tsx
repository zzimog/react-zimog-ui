import { useCallback } from 'react';
import { poly } from '../polymorphic';
import { useMergedRefs } from '../hooks';
import { cn } from '../utils';
import { Highlight } from '../Highlight';
import { useTabsContext } from './tabsContext';
import classes from './tabsClasses';

export type TabsTriggerProps = {
  value: string;
  disabled?: boolean;
};

export const TabsTrigger = poly.button<TabsTriggerProps>((Tag, inProps) => {
  const {
    ref: refProp,
    value: valueProp,
    disabled,
    className,
    ...props
  } = inProps;

  const { baseId, value, setValue } = useTabsContext();

  const triggerId = `${baseId}-trigger-${value}`;
  const itemId = `${baseId}-item-${value}`;

  const isActive = valueProp === value;

  const ref = useCallback(
    (node: HTMLElement) => {
      function handleClick() {
        if (!disabled) {
          setValue(valueProp);
        }
      }

      node.addEventListener('click', handleClick);
      return () => node.removeEventListener('click', handleClick);
    },
    [disabled]
  );

  const mergedRefs = useMergedRefs(refProp, ref);

  return (
    <Highlight.Item
      as={Tag}
      ref={mergedRefs}
      id={triggerId}
      role="tab"
      aria-controls={itemId}
      aria-selected={isActive}
      data-selected={isActive}
      className={cn(classes.trigger, className)}
      selected={isActive}
      disabled={disabled}
      {...props}
    />
  );
});
