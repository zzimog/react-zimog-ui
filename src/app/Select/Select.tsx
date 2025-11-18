import { Popover, cn, useControllableState } from '@ui';
import { ChevronDown } from 'lucide-react';
import {
  createContext,
  useContext,
  useState,
  type ComponentPropsWithoutRef,
} from 'react';

type SelectContextValue = {
  value: string;
  setValue(value: string): void;
  setLabel(label: string): void;
};

const SelectContext = createContext<SelectContextValue | undefined>(undefined);

type SelectProps = ComponentPropsWithoutRef<'button'> & {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
};

export const Select = (inProps: SelectProps) => {
  const {
    value: valueProp,
    defaultValue = '',
    onChange,
    children,
    ...props
  } = inProps;

  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultValue,
    onChange,
  });

  const [label, setLabel] = useState('');

  const context = {
    value,
    setValue,
    setLabel,
  };

  return (
    <Popover>
      <Popover.Trigger
        type="button"
        className={cn(
          'flex',
          'justify-between',
          'items-center',
          'h-10',
          'p-2',
          'border',
          'text-sm',
          'border-border',
          'bg-white',
          'rounded-shape',
          'cursor-pointer',
          'select-none',
          'focusable',
          'focus:outline-outline',
          'focus:border-primary',
          'hover:border-primary',
          'transition-colors'
        )}
        {...props}
      >
        {label}
        <ChevronDown className="size-4" />
      </Popover.Trigger>
      <Popover.Content
        align="start"
        className={cn(
          'flex',
          'w-(--width)',
          'max-h-32',
          'border',
          'text-sm',
          'border-border',
          'hover:border-primary',
          'transition-colors',
          'bg-white',
          'rounded-shape',
          'overflow-hidden'
        )}
      >
        <ul tabIndex={-1} className="w-full overflow-auto">
          <SelectContext value={context}>{children}</SelectContext>
        </ul>
      </Popover.Content>
    </Popover>
  );
};

type SelectOptionProps = {
  label: string;
  value?: string;
  selected?: boolean;
  disabled?: boolean;
};

const SelectOption = (inProps: SelectOptionProps) => {
  const { label, value = '' } = inProps;

  const context = useContext(SelectContext);

  if (!context) {
    throw new Error('SelectOption must be used within Select element.');
  }

  function handleClick() {
    context?.setValue(value);
    context?.setLabel(label);
  }

  return (
    <li className="p-2 hover:bg-zinc-100 cursor-pointer" onClick={handleClick}>
      {label}
    </li>
  );
};

Select.displayName = 'Select';
SelectOption.displayName = 'SelectOption';
Select.Option = SelectOption;
