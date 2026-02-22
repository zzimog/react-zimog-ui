import { useEffect, useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';
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
    children,
    onFocus,
    onBlur,
    onPointerMove,
    onPointerUp,
    onKeyDown,
    ...props
  } = inProps;

  const [highlighted, setHighlighted] = useState(false);

  const context = Select.useContext(DISPLAY_NAME);
  const collection = Select.useCollection();
  /*const contentContext =*/ SelectContent.useContext(DISPLAY_NAME);
  const groupContext = SelectGroup.useContext(DISPLAY_NAME);

  const selected = value === context.value;
  const disabled = groupContext.disabled || disabledProp || false;

  const ref = useRef<HTMLElement>(null);
  const mergedRef = useMergedRefs(refProp, ref, (node: HTMLElement) => {
    collection.onItemAdd(node, {
      node,
      value,
      disabled,
      text: node.textContent,
    });

    return () => collection.onItemRemove(node);
  });

  function handleSelect() {
    if (!disabled) {
      context.onValueChange(value);
      context.onCurrentNodeChange(ref.current!);
    }
  }

  useEffect(() => {
    if (selected) {
      setTimeout(() => {
        ref.current?.focus({ preventScroll: true });
      });
    }
  }, [selected]);

  return (
    <Native.div
      ref={mergedRef}
      role="option"
      aria-disabled={disabled}
      aria-selected={selected || highlighted}
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
      onKeyDown={composeHandlers(onKeyDown, (event) => {
        if (event.key === ' ') event.preventDefault();
        if (event.key === 'Enter') handleSelect();
      })}
    >
      {selected && <ChevronRight className={cn(classes.check)} />}
      {children}
    </Native.div>
  );
};

SelectOption.displayName = DISPLAY_NAME;
