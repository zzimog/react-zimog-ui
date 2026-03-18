import { useEffect, useRef, type ComponentPropsWithRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { Popover } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';
import { cn, composeHandlers } from '@ui/utils';
import { Select } from './Select';
import classes from './classes';

const DISPLAY_NAME = 'SelectTrigger';

type BaseProps = ComponentPropsWithRef<typeof Popover.Trigger>;
interface SelectTriggerProps extends BaseProps {
  placeholder?: string;
}

export const SelectTrigger = (inProps: SelectTriggerProps) => {
  const {
    ref: refProp,
    placeholder: placeholderProp,
    className,
    onClick,
    onPointerDown,
    onKeyDown,
    ...props
  } = inProps;

  const {
    open,
    currentNode,
    onTriggerChange,
    onOpenChange,
    onValueChange,
    onCurrentNodeChange,
  } = Select.useContext(DISPLAY_NAME);

  const { getItems } = Select.useCollection();

  const pointerTypeRef = useRef<string>(null);

  const ref = useRef<HTMLElement>(null);
  const mergedRef = useMergedRefs(refProp, ref, onTriggerChange);

  const hasPlaceholder = !currentNode?.textContent;
  const placeholder = placeholderProp || 'Select an option';

  /*
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
  */

  return (
    <Popover.Trigger
      ref={mergedRef}
      type="button"
      role="combobox"
      aria-haspopup="listbox"
      aria-activedescendant={currentNode?.id || undefined}
      {...props}
      className={cn(classes.trigger, className)}
      onClick={composeHandlers(onClick, (event) => {
        const pointerType = pointerTypeRef.current;
        if (pointerType !== 'mouse') {
          onOpenChange(!open);
        }

        event.currentTarget.focus();
        event.preventDefault();
      })}
      onPointerDown={composeHandlers(onPointerDown, (event) => {
        const target = event.target as HTMLElement;
        if (target.hasPointerCapture(event.pointerId)) {
          target.releasePointerCapture(event.pointerId);
        }

        if (
          event.pointerType === 'mouse' &&
          event.button === 0 &&
          event.ctrlKey === false
        ) {
          onOpenChange(!open);
          event.preventDefault();
        }

        pointerTypeRef.current = event.pointerType;
      })}
      onKeyDown={composeHandlers(onKeyDown, (event) => {
        if ([' ', 'Enter', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
          onOpenChange(true);
          event.preventDefault();
        }

        if (['Home', 'End', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
          const items = getItems().filter((item) => !item.disabled);
          let [nextItem] = items;

          if (['ArrowLeft', 'End'].includes(event.key)) {
            [nextItem] = items.reverse();
          }

          if (['ArrowLeft', 'ArrowRight'].includes(event.key)) {
            const currentIndex = items.findIndex((item) => item.selected);
            nextItem = items[currentIndex + 1];
          }

          if (nextItem) {
            onValueChange(nextItem.value);
            onCurrentNodeChange(nextItem.node);
            event.preventDefault();
          }
        }
      })}
    >
      <span
        data-placeholder={hasPlaceholder ? '' : undefined}
        className={cn(classes.value)}
      >
        {currentNode?.textContent || placeholder}
      </span>
      <ChevronDown />
    </Popover.Trigger>
  );
};

SelectTrigger.displayName = DISPLAY_NAME;
