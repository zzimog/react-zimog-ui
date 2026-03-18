import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { useMergedRefs } from '@ui';
import { Native, type NativeProps } from '@ui/headless';
import { cn, composeHandlers } from '@ui/utils';
import { Select } from './Select';
import { SelectContent } from './SelectContent';
import { SelectGroup } from './SelectGroup';
import classes from './classes';

const DISPLAY_NAME = 'SelectOption';

type BaseProps = NativeProps<'div'>;
type SelectOptionProps = BaseProps & {
  value: string;
  disabled?: boolean;
};

export const SelectOption = (inProps: SelectOptionProps) => {
  const {
    ref: refProp,
    value,
    disabled: disabledProp,
    className,
    children,
    onFocus,
    onBlur,
    onPointerMove,
    onPointerUp,
    onKeyDown,
    ...props
  } = inProps;

  const [highlighted, setHighlighted] = useState(false);

  const collection = Select.useCollection();
  const context = Select.useContext(DISPLAY_NAME);
  const optionsContext = Select.useOptionsContext(DISPLAY_NAME);
  const groupContext = SelectGroup.useContext(DISPLAY_NAME);
  SelectContent.useContext(DISPLAY_NAME);

  const selected = value === context.value;
  const disabled = groupContext.disabled || disabledProp;

  const ref = useRef<HTMLElement>(null);
  const mergedRef = useMergedRefs(refProp, ref, (node: HTMLElement) => {
    collection.onItemAdd(node, {
      node,
      value,
      selected,
      disabled,
    });

    return () => collection.onItemRemove(node);
  });

  const { onOptionAdd, onOptionRemove } = optionsContext;
  const option = useMemo(
    () => (
      <option key={value} value={value} disabled={disabled}>
        {children}
      </option>
    ),
    [value, disabled, children]
  );

  function handleHighlight(focus: boolean) {
    if (context.open) {
      setHighlighted(focus);
    }
  }

  function handleSelect() {
    if (!disabled) {
      context.onValueChange(value);
      context.onOpenChange(false);
    }
  }

  useLayoutEffect(() => {
    onOptionAdd(option);
    return () => onOptionRemove(option);
  }, [option, onOptionAdd, onOptionRemove]);

  return (
    <Native.div
      ref={mergedRef}
      role="option"
      aria-selected={selected || highlighted}
      aria-disabled={disabled}
      data-highlighted={highlighted ? '' : undefined}
      tabIndex={0}
      {...props}
      className={cn(classes.option, className)}
      onFocus={composeHandlers(onFocus, () => handleHighlight(true))}
      onBlur={composeHandlers(onBlur, () => handleHighlight(false))}
      onPointerMove={composeHandlers(onPointerMove, (event) => {
        const isMouse = event.pointerType === 'mouse';
        if (isMouse && context.open && !disabled) {
          event.currentTarget.focus({ preventScroll: true });
        }
      })}
      onPointerUp={composeHandlers(onPointerUp, () => {
        handleSelect();
      })}
      onKeyDown={composeHandlers(onKeyDown, (event) => {
        if (event.key === ' ') event.preventDefault();
        if (event.key === 'Enter') {
          handleSelect();
          event.preventDefault();
        }
      })}
    >
      {selected && <Check className={cn(classes.check)} />}
      {children}
    </Native.div>
  );
};

SelectOption.displayName = DISPLAY_NAME;
