import { useCallback } from 'react';
import { Highlight } from '../Highlight';
import { useMergedRefs } from '../hooks';
import { type NativeProps, Native } from '../Native';
import { cn } from '../utils';
import classes from './tabsClasses';
import { useTabsContext } from './tabsContext';

export type TabsTriggerProps = NativeProps<'button'> & {
  value: string;
};

export const TabsTrigger = (inProps: TabsTriggerProps) => {
  const {
    ref: refProp,
    value: valueProp,
    disabled,
    className,
    ...props
  } = inProps;

  const { baseId, value, onValueChange } = useTabsContext();

  const triggerId = `${baseId}-trigger-${value}`;
  const itemId = `${baseId}-item-${value}`;

  const isActive = valueProp === value;

  const ref = useCallback(
    (node: HTMLElement) => {
      function handleClick() {
        if (!disabled) {
          onValueChange(valueProp);
        }
      }

      node.addEventListener('click', handleClick);
      return () => node.removeEventListener('click', handleClick);
    },
    [disabled]
  );

  const mergedRefs = useMergedRefs(refProp, ref);

  return (
    <Highlight.Item selected={isActive} disabled={disabled} asChild>
      <Native.button
        ref={mergedRefs}
        id={triggerId}
        role="tab"
        aria-controls={itemId}
        aria-selected={isActive}
        data-selected={isActive}
        className={cn(classes.trigger, className)}
        {...props}
      />
    </Highlight.Item>
  );
};
