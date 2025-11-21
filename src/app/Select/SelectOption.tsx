import { Check } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useSelectContext } from './selectContext';
import { cn } from '@ui';

type SelectOptionProps = {
  label: string;
  value: string;
  disabled?: boolean;
};

export const SelectOption = (inProps: SelectOptionProps) => {
  const { label, value, disabled } = inProps;

  const ref = useRef<HTMLLIElement>(null);

  const context = useSelectContext();
  const isSelected = value === context.value;

  function handleClick() {
    if (!disabled) {
      context?.setSelected(value, label);
    }
  }

  function handleMouseOver() {
    const node = ref.current;
    node?.focus({ preventScroll: true });
  }

  useEffect(() => {
    const node = ref.current;
    if (node && isSelected) {
      node.scrollIntoView();
      node.focus();
    }

    if (!context.value) {
      handleClick();
    }
  }, []);

  return (
    <li
      ref={ref}
      role="option"
      data-selected={isSelected ? '' : undefined}
      tabIndex={0}
      className={cn(
        'grid',
        'grid-cols-[1fr_calc(var(--spacing)*4)]',
        'items-center',
        'gap-2',
        'px-2 py-1',
        'rounded-shape',
        'outline-0',
        'focus:bg-zinc-100',
        'dark:focus:bg-highlight',
        'cursor-pointer',
        'select-none'
      )}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
    >
      <span>{label}</span>
      {isSelected && <Check className="size-4 col-start-2" />}
    </li>
  );
};

SelectOption.displayName = 'SelectOption';
