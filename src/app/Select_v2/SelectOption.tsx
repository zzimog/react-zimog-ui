import { useState } from 'react';
import { useMergedRefs } from '@ui';
import { Native, type NativeProps } from '@ui/headless';
import { cn, composeHandlers } from '@ui/utils';
import { Select } from './Select';
import classes from './classes';

const DISPLAY_NAME = 'SelectOption';

type SelectOptionProps = NativeProps<'div'> & {
  value: string;
  disabled?: boolean;
};

export const SelectOption = (inProps: SelectOptionProps) => {
  const {
    ref: refProp,
    value,
    disabled = false,
    className,
    onFocus,
    onBlur,
    onPointerMove,
    onPointerUp,
    onKeyDown,
    ...props
  } = inProps;

  const [textContent, setTextContent] = useState('');
  const [highlighted, setHighlighted] = useState(false);

  const context = Select.useContext(DISPLAY_NAME);
  const collection = Select.useCollection();

  const ref = useMergedRefs(refProp, (node: HTMLElement) => {
    const textContent = node.textContent;
    collection.onItemAdd(node, {
      node,
      value,
      textContent,
      disabled,
    });

    setTextContent(textContent);
    return () => collection.onItemRemove(node);
  });

  function handleSelect() {
    if (!disabled) {
      context.onValueChange(value, textContent);
      context.onOpenChange(false);
    }
  }

  return (
    <Native.div
      ref={ref}
      role="option"
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
      onKeyDown={composeHandlers(onKeyDown, (event) => {
        if (event.key === ' ') event.preventDefault();
        if (event.key === 'Enter') handleSelect();
      })}
    />
  );
};

SelectOption.displayName = DISPLAY_NAME;
