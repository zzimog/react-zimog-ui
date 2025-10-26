import { useCallback } from 'react';
import { type PolyProps, Poly } from '../polymorphic';
import { useMergedRefs } from '../hooks';
import { cn } from '../utils';
import { Highlight } from '../Highlight';
import { useTabsContext } from './tabsContext';
import classes from './tabsClasses';

export type TabsTriggerProps = PolyProps<'button'> & {
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
    <Highlight.Item asChild selected={isActive} disabled={disabled}>
      <Poly.button
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
