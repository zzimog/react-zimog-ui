import { useLayoutEffect, useMemo, useRef } from 'react';
import { Check } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useMergedRefs } from '@ui';
import { Native, type NativeProps } from '@ui/headless';
import { cn, composeHandlers } from '@ui/utils';
import { Select } from './Select';
import { SelectContent } from './SelectContent';
import { SelectGroup } from './SelectGroup';
import classes from './classes';

const DISPLAY_NAME = 'SelectOption';

type BaseProps = Omit<NativeProps<'div'>, 'id'>;
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
    onPointerDown,
    onPointerMove,
    onPointerUp,
    ...props
  } = inProps;

  const context = Select.useContext(DISPLAY_NAME);
  const collection = Select.useCollection();
  const groupContext = SelectGroup.useContext(DISPLAY_NAME);
  SelectContent.useContext(DISPLAY_NAME);

  const id = `${context.baseId}-${value}`;
  const selected = value === context.value;
  const disabled = groupContext.disabled || disabledProp;
  const isEmpty = value === '';
  const isActive = id === context.activeId;

  const ref = useRef<HTMLElement>(null);
  const mergedRef = useMergedRefs(refProp, ref, (node: HTMLElement) => {
    collection.onItemAdd(node, {
      node,
      value,
      disabled,
    });
    return () => collection.onItemRemove(node);
  });

  const { onOptionAdd, onOptionRemove } = context;
  const option = useMemo(
    () => (
      <option key={value} value={value} disabled={disabled}>
        {children}
      </option>
    ),
    [value, disabled, children]
  );

  useLayoutEffect(() => {
    onOptionAdd(option);
    return () => onOptionRemove(option);
  }, [option, onOptionAdd, onOptionRemove]);

  useLayoutEffect(() => {
    const node = ref.current;
    if (node && context.open && selected) {
      context.onActiveIdChange(id);
      node.scrollIntoView({ block: 'center' });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.open]);

  return (
    <Native.div
      ref={mergedRef}
      id={id}
      role="option"
      aria-selected={selected}
      aria-disabled={disabled}
      data-active={isActive ? '' : undefined}
      data-empty={isEmpty ? '' : undefined}
      {...props}
      className={cn(classes.option, className)}
      onPointerDown={composeHandlers(onPointerDown, (event) => {
        event.preventDefault();
      })}
      onPointerMove={composeHandlers(onPointerMove, (event) => {
        if (!disabled && event.pointerType === 'mouse') {
          context.onActiveIdChange(id);
        }
      })}
      onPointerUp={composeHandlers(onPointerUp, () => {
        if (!disabled) {
          context.onValueChange(value);
          context.onActiveIdChange(id);
          context.onOpenChange(false);
        }
      })}
    >
      {!isEmpty && selected && <Check className={cn(classes.check)} />}
      {children}

      {selected && context.valueNode
        ? createPortal(children, context.valueNode)
        : null}
    </Native.div>
  );
};

SelectOption.displayName = DISPLAY_NAME;
