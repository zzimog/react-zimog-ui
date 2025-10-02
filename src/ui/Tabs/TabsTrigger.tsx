import {
  type ElementType,
  type HTMLAttributes,
  useRef,
  useEffect,
} from 'react';
import { cn } from '../utils';
import classes from './tabsClasses';
import { useTabsContext } from './tabsContext';
import { useTabsListContext } from './tabsListContext';

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
  const { setActive } = useTabsListContext();

  const triggerId = `${baseId}-trigger-${value}`;
  const itemId = `${baseId}-item-${value}`;

  const isActive = valueProp === value;

  function handleClick() {
    if (!isActive && !disabled) {
      setValue(valueProp);
    }
  }

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (isActive) {
      setActive(node);
    }
  }, [isActive, setActive]);

  return (
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
  );
};
