import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { Native, Popover, type NativeProps } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';
import { cn, composeHandlers } from '@ui/utils';
import { Select } from './Select';
import classes from './classes';

const DISPLAY_NAME = 'SelectTrigger';

type SelectTriggerProps = NativeProps<'button'> & {
  placeholder?: string;
};

export const SelectTrigger = (inProps: SelectTriggerProps) => {
  const {
    ref: refProp,
    placeholder: placeholderProp,
    className,
    onPointerDown,
    ...props
  } = inProps;

  const { open, currentNode } = Select.useContext(DISPLAY_NAME);

  const ref = useRef<HTMLElement>(null);
  const mergedRef = useMergedRefs(refProp, ref);

  const hasPlaceholder = !!currentNode?.textContent;
  const placeholder = placeholderProp || 'Select an option';

  const previousOpenRef = useRef(open);
  useEffect(() => {
    const wasOpen = previousOpenRef.current;
    if (open !== wasOpen) {
      if (!open) {
        ref.current?.focus();

        requestAnimationFrame(() => {
          const currentActive = document.activeElement;
          if (currentActive === document.body) {
            ref.current?.focus();
          }
        });
      }

      previousOpenRef.current = open;
    }
  }, [open]);

  return (
    <Popover.Trigger asChild>
      <Native.button
        ref={mergedRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-activedescendant={currentNode?.id || undefined}
        {...props}
        className={cn(classes.trigger, className)}
        onPointerDown={composeHandlers(onPointerDown, (event) => {
          /**
           * Prevent visible focus on click when closed
           */
          if (!open) event.preventDefault();
        })}
      >
        <span
          data-placeholder={hasPlaceholder ? '' : undefined}
          className={cn(classes.value)}
        >
          {currentNode?.textContent || placeholder}
        </span>
        <ChevronDown />
      </Native.button>
    </Popover.Trigger>
  );
};

SelectTrigger.displayName = DISPLAY_NAME;
