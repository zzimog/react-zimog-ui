import { useState } from 'react';
import { Check } from 'lucide-react';
import { Native, type NativeProps } from '@ui/headless';
import { cn, composeHandlers } from '@ui/utils';
import { Select } from './Select';
import { SelectContent } from './SelectContent';
import classes from './classes';

const DISPLAY_NAME = 'SelectItem';

type SelectItemProps = NativeProps<'div'> & {
  value: string;
  disabled?: boolean;
};

export const SelectItem = (inProps: SelectItemProps) => {
  const {
    value,
    disabled,
    className,
    children,
    onFocus,
    onBlur,
    onClick,
    onPointerMove,
    onPointerLeave,
    onKeyDown,
    ...props
  } = inProps;

  const context = Select.useContext(DISPLAY_NAME);
  const contentContext = SelectContent.useContext(DISPLAY_NAME);

  const isSelected = context.value === value;
  const [isFocused, setIsFocused] = useState(false);

  function handleSelect() {
    if (!disabled) {
      context.onValueChange(value);
      // context.onOpenChange(false);
    }
  }

  if (value === '') {
    throw new Error(
      'A `SelectItem` cannot have an empty string as `value` prop.'
    );
  }

  return (
    <Native.div
      role="option"
      aria-selected={isSelected}
      aria-disabled={disabled || undefined}
      data-highlighted={isFocused ? '' : undefined}
      tabIndex={disabled ? undefined : -1}
      {...props}
      className={cn(classes.item, className)}
      onFocus={composeHandlers(onFocus, (event) => {
        contentContext.onItemFocus(event.currentTarget);
        setIsFocused(true);
      })}
      onBlur={composeHandlers(onBlur, () => setIsFocused(false))}
      onClick={composeHandlers(onClick, () => handleSelect())}
      onPointerMove={composeHandlers(onPointerMove, (event) => {
        if (disabled) {
          contentContext.onItemLeave();
        } else {
          event.currentTarget.focus({ preventScroll: true });
        }
      })}
      onPointerLeave={composeHandlers(onPointerLeave, () => {
        contentContext.onItemLeave();
      })}
      onKeyDown={composeHandlers(onKeyDown, (event) => {
        if (event.key === ' ') {
          event.preventDefault();
        } else if (event.key === 'Enter') {
          handleSelect();
        }
      })}
    >
      {isSelected && <Check className={classes.itemCheck} />}
      {children}
    </Native.div>
  );
};

SelectItem.displayName = DISPLAY_NAME;
