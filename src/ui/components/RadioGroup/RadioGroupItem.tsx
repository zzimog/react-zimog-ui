import type { ComponentPropsWithRef } from 'react';
import { Check } from 'lucide-react';
import { Checkable } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';
import { cn, composeHandlers } from '@ui/utils';
import checkboxClasses from '../Checkbox/classes';
import { RadioGroup } from './RadioGroup';
import classes from './classes';

const FIRST_KEYS = ['Home', 'PageUp'];
const LAST_KEYS = ['End', 'PageDown'];
const PREV_KEYS = ['ArrowLeft', 'ArrowUp'];
const NEXT_KEYS = ['ArrowRight', 'ArrowDown'];
const NAV_KEYS = [...FIRST_KEYS, ...LAST_KEYS, ...PREV_KEYS, ...NEXT_KEYS];

const DISPLAY_NAME = 'RadioGroupItem';

type CheckableProps = ComponentPropsWithRef<typeof Checkable>;
type BaseProps = Omit<CheckableProps, 'name'>;
type RadioGroupItemProps = BaseProps & {
  value: string;
};

export const RadioGroupItem = (inProps: RadioGroupItemProps) => {
  const {
    ref,
    id: idProp,
    value,
    disabled = false,
    className,
    onKeyDown,
    ...props
  } = inProps;

  const context = RadioGroup.useContext(DISPLAY_NAME);
  const { getItems, onItemAdd, onItemRemove } = RadioGroup.useCollection();

  const mergedRef = useMergedRefs(ref, (node: HTMLElement) => {
    if (!disabled) {
      onItemAdd(node, { node });
      return () => onItemRemove(node);
    }
  });

  const composedId = `${context.baseId}-${value}`;
  const id = idProp ?? composedId;

  const isChecked = context.value === value;
  const isDisabled = context.disabled || disabled;

  return (
    <Checkable
      ref={mergedRef}
      type="radio"
      id={id}
      name={context.name}
      disabled={isDisabled}
      checked={isChecked}
      tabIndex={isChecked ? 0 : -1}
      {...props}
      className={cn(checkboxClasses.root, classes.item, className)}
      onCheckedChange={() => {
        context.onValueChange(value);
      }}
      onKeyDown={composeHandlers(onKeyDown, (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
        }

        if (event.target !== event.currentTarget) {
          return;
        }

        if (NAV_KEYS.includes(event.key)) {
          const items = getItems();
          let [nextItem] = items;

          if ([...LAST_KEYS, ...PREV_KEYS].includes(event.key)) {
            [nextItem] = items.reverse();
          }

          if ([...PREV_KEYS, ...NEXT_KEYS].includes(event.key)) {
            const target = event.target;
            const index = items.findIndex((i) => i.node === target);
            [nextItem] = items.slice(index + 1);
          }

          nextItem?.node.click();
          nextItem?.node.focus();
          event.preventDefault();
        }
      })}
    >
      <Checkable.Indicator className={cn(checkboxClasses.indicator)} asChild>
        <Check />
      </Checkable.Indicator>
    </Checkable>
  );
};

RadioGroupItem.displayName = DISPLAY_NAME;
