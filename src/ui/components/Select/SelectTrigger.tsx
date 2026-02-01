import { ChevronDown } from 'lucide-react';
import { Native, Popover, type NativeProps } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';
import { cn } from '@ui/utils';
import { Select } from './Select';
import classes from './classes';

const DISPLAY_NAME = 'SelectTrigger';

type SelectTriggerProps = NativeProps<'button'>;

export const SelectTrigger = (inProps: SelectTriggerProps) => {
  const { ref: refProp, className, ...props } = inProps;

  const context = Select.useContext(DISPLAY_NAME);
  const { placeholder, currentNode, onTriggerChange } = context;

  const ref = useMergedRefs(refProp, onTriggerChange);

  const selectedId = currentNode?.id || undefined;
  const textValue = currentNode?.textContent || placeholder;

  return (
    <Popover.Trigger asChild>
      <Native.button
        ref={ref}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-activedescendant={selectedId}
        {...props}
        className={cn(classes.trigger, className)}
      >
        {textValue}
        <ChevronDown />
      </Native.button>
    </Popover.Trigger>
  );
};

SelectTrigger.displayName = DISPLAY_NAME;
