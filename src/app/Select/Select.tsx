import { Popover, cn, useControllableState } from '@ui';
import { ChevronDown } from 'lucide-react';
import {
  type ComponentPropsWithoutRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { SelectContext } from './selectContext';
import { SelectOption } from './SelectOption';
import { useFocusGuards } from './useFocusGuards';

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

  const [label, setLabel] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState(true);

  const context = {
    value,
    setSelected(value: string, label: string) {
      setValue(value);
      setLabel(label);
      setOpen(false);
    },
  };

  const ref = useRef<HTMLDivElement>(null);

  function handleOpenChange(open: boolean) {
    setOpen(open);
  }

  const prevFocusRef = useRef<HTMLElement>(null);

  useFocusGuards(open);

  useEffect(() => {
    function handleFocusIn(event: Event) {
      const target = event.target as HTMLElement;
      const content = ref.current;
      if (content) {
        const options = content.querySelectorAll<HTMLElement>(
          '[role="option"][tabIndex]'
        );

        const first = options[0];
        const last = options[options.length - 1];

        const lastFocus = prevFocusRef.current;

        if (!content.contains(target)) {
          if (lastFocus === first) {
            last.focus();
            prevFocusRef.current = last;
          }

          if (lastFocus === last) {
            first.focus();
            prevFocusRef.current = first;
          }
        } else {
          prevFocusRef.current = target;
        }
      }
    }

    window.addEventListener('focusin', handleFocusIn);
    return () => window.addEventListener('focusin', handleFocusIn);
  }, []);

  useLayoutEffect(() => {
    setOpen(false);
  }, []);

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <Popover.Trigger
        role="combobox"
        type="button"
        className={cn(
          'flex',
          'justify-between',
          'items-center',
          'h-10',
          'px-3 py-2',
          'border',
          'text-sm',
          'border-border',
          'bg-white',
          'dark:bg-zinc-800',
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
        ref={ref}
        align="start"
        className={cn(
          'flex',
          'w-(--width)',
          'max-h-32',
          'border',
          'text-sm',
          'focusable',
          'focus-within:outline-outline',
          'focus-within:border-primary',
          'border-border',
          'hover:border-primary',
          'transition-colors',
          'bg-white',
          'dark:bg-zinc-800',
          'rounded-shape',
          'overflow-hidden',
          '[--exit-scale-y:0]',
          '[--enter-scale-y:0]'
        )}
      >
        <ul tabIndex={-1} className="w-full p-2 overflow-auto outline-0">
          <SelectContext value={context}>{children}</SelectContext>
        </ul>
      </Popover.Content>
    </Popover>
  );
};

Select.displayName = 'Select';
Select.Option = SelectOption;
