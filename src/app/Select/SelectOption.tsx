import { Check } from 'lucide-react';
import { useContext, useEffect, useRef } from 'react';
import { useSelectContext } from './selectContext';
import { SelectOptionsGroupContext } from './SelectOptionsGroup';
import classes from './selectClasses';

type SelectOptionProps = {
  label: string;
  value: string;
  disabled?: boolean;
};

export const SelectOption = (inProps: SelectOptionProps) => {
  const { label, value, disabled: disabledProp } = inProps;

  const context = useSelectContext();
  const isSelected = value === context.value;

  const groupContext = useContext(SelectOptionsGroupContext);
  const disabled = (disabledProp ?? groupContext?.disabled) || false;

  const ref = useRef<HTMLElement>(null);

  function handleSelect() {
    const node = ref.current;
    if (node && !disabled) {
      context?.setSelected(value, node);
      context?.setOpen(false);
    }
  }

  useEffect(() => {
    const node = ref.current;
    if (node) {
      if (isSelected) {
        node.focus({ preventScroll: true });
      }

      if (isSelected || (!context.value && !disabled)) {
        context?.setSelected(value, node);
      }
    }
  }, []);

  return (
    <span
      ref={ref}
      role="option"
      data-selected={isSelected ? '' : undefined}
      data-disabled={disabled ? '' : undefined}
      tabIndex={disabled ? -1 : 0}
      className={classes.option({ disabled })}
      onClick={handleSelect}
      onPointerMove={(event) => {
        const isMouse = event.pointerType === 'mouse';
        if (isMouse && !disabled) {
          event.currentTarget.focus({ preventScroll: true });
        }
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          handleSelect();
          if (event.key === ' ') {
            event.preventDefault();
          }
        }
      }}
    >
      <span>{label}</span>
      {isSelected && <Check className="size-4 col-start-2" />}
    </span>
  );
};

SelectOption.displayName = 'SelectOption';
