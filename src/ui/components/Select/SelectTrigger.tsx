import { ChevronDown } from 'lucide-react';
import { Native, Popover, type NativeProps } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';
import { cn } from '@ui/utils';
import { Select } from './Select';
import classes from './classes';

const DISPLAY_NAME = 'SelectTrigger';

type SelectTriggerProps = NativeProps<'button'> & {
  placeholder?: string;
};

export const SelectTrigger = (inProps: SelectTriggerProps) => {
  const { ref: refProp, placeholder, className, ...props } = inProps;

  const { triggerRef, currentNode } = Select.useContext(DISPLAY_NAME);
  const mergedRef = useMergedRefs(refProp, triggerRef);

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
      >
        {currentNode?.textContent || placeholder || '-'}
        <ChevronDown />
      </Native.button>
    </Popover.Trigger>
  );
};

SelectTrigger.displayName = DISPLAY_NAME;
