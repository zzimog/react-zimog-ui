import { useRef, useState } from 'react';
import { useMergedRefs } from '@ui';
import { Native, type NativeProps } from '@ui/headless';
import { cn, composeHandlers } from '@ui/utils';
import { Select } from './Select';
import { SelectContent } from './SelectContent';
import { SelectGroup } from './SelectGroup';
import classes from './classes';

const DISPLAY_NAME = 'SelectOption';

type SelectOptionProps = NativeProps<'div'> & {
  disabled?: boolean;
  value: string;
};

export const SelectOption = (inProps: SelectOptionProps) => {
  const {
    ref: refProp,
    disabled: disabledProp,
    value,
    className,
    onFocus,
    onBlur,
    onPointerMove,
    onPointerUp,
    onPointerLeave,
    onKeyDown,
    ...props
  } = inProps;

  const [highlighted, setHighlighted] = useState(false);

  const context = Select.useContext(DISPLAY_NAME);
  const collection = Select.useCollection();
  const contentContext = SelectContent.useContext(DISPLAY_NAME);
  const groupContext = SelectGroup.useContext(DISPLAY_NAME);

  const disabled = groupContext.disabled || disabledProp || false;

  const ref = useRef<HTMLElement>(null);
  const mergedRef = useMergedRefs(refProp, ref, (node: HTMLElement) => {
    const textContent = node.textContent;
    collection.onItemAdd(node, {
      node,
      value,
      textContent,
      disabled,
    });

    return () => collection.onItemRemove(node);
  });

  function handleSelect() {
    if (!disabled) {
      context.onValueChange(value);
      context.onCurrentNodeChange(ref.current!);
    }
  }

  return (
    <Native.div
      ref={mergedRef}
      role="option"
      aria-disabled={disabled}
      aria-selected={value === context.value}
      data-highlighted={highlighted ? '' : undefined}
      tabIndex={0}
      {...props}
      className={cn(classes.option, className)}
      onFocus={composeHandlers(onFocus, () => setHighlighted(true))}
      onBlur={composeHandlers(onBlur, () => setHighlighted(false))}
      onPointerMove={composeHandlers(onPointerMove, (event) => {
        if (!disabled) {
          event.currentTarget.focus({ preventScroll: true });
        }
      })}
      onPointerUp={composeHandlers(onPointerUp, () => {
        handleSelect();
      })}
      onPointerLeave={composeHandlers(onPointerLeave, () => {
        contentContext.onOptionLeave();
      })}
      onKeyDown={composeHandlers(onKeyDown, (event) => {
        if (event.key === ' ') event.preventDefault();
        if (event.key === 'Enter') handleSelect();
      })}
    />
  );
};

SelectOption.displayName = DISPLAY_NAME;
