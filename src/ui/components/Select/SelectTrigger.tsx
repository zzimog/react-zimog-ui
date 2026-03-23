import { Native, Popper, type NativeProps } from '@ui/headless';
import { cn, composeHandlers } from '@ui/utils';
import { Select } from './Select';
import classes from './classes';

const DISPLAY_NAME = 'SelectTrigger';

type BaseProps = NativeProps<'button'>;
type SelectTriggerProps = BaseProps;

export const SelectTrigger = (inProps: SelectTriggerProps) => {
  const { disabled, className, onBlur, onClick, onKeyDown, ...props } = inProps;

  const {
    value,
    open,
    activeId,
    content,
    onValueChange,
    onActiveIdChange,
    onOpenChange,
    ...context
  } = Select.useContext(DISPLAY_NAME);

  const { getItems } = Select.useCollection();

  const isRequired = context.required;
  const isDisabled = context.disabled || disabled;

  return (
    <Popper.Anchor asChild>
      <Native.button
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-activedescendant={open ? activeId : undefined}
        aria-required={isRequired ? true : undefined}
        disabled={isDisabled}
        {...props}
        className={cn(classes.trigger, className)}
        onBlur={composeHandlers(onBlur, () => {
          onOpenChange(false);
        })}
        onClick={composeHandlers(onClick, () => {
          onOpenChange(!open);
        })}
        onKeyDown={composeHandlers(onKeyDown, (event) => {
          const SELECT_KEYS = [' ', 'Enter'];
          const OPEN_KEYS = [...SELECT_KEYS, 'ArrowUp', 'ArrowDown'];

          const items = getItems().filter((item) => !item.disabled);
          if (items.length <= 0) return;

          if (open) {
            const selectCurrent = () => {
              const item = items.find((i) => i.node.id === activeId);
              if (item) onValueChange(item.value);
              onOpenChange(false);
            };

            if (
              SELECT_KEYS.includes(event.key) ||
              (event.altKey && event.key === 'ArrowUp')
            ) {
              selectCurrent();
              event.preventDefault();
              return;
            }

            if (event.key === 'Tab') {
              selectCurrent();
              return;
            }

            if (event.key === 'Escape') {
              onOpenChange(false);
              event.preventDefault();
              return;
            }
          } else if (OPEN_KEYS.includes(event.key)) {
            onOpenChange(true);
            event.preventDefault();
            return;
          }

          const PREV_KEY = open ? 'ArrowUp' : 'ArrowLeft';
          const NEXT_KEY = open ? 'ArrowDown' : 'ArrowRight';
          const NAV_KEYS = ['Home', 'End', PREV_KEY, NEXT_KEY];

          if (NAV_KEYS.includes(event.key)) {
            const currentIndex = items.findIndex((item) =>
              open ? item.node.id === activeId : item.value === value
            );

            const indexMap = {
              Home: 0,
              End: items.length - 1,
              [PREV_KEY]: Math.max(0, currentIndex - 1),
              [NEXT_KEY]: Math.min(items.length - 1, currentIndex + 1),
            };

            const nextIndex = indexMap[event.key]!;
            const nextItem = items[nextIndex]!;
            if (open) {
              onActiveIdChange(nextItem.node.id);
              nextItem.node.scrollIntoView({ block: 'nearest' });

              if (content) {
                const isFirst = nextIndex === 0;
                const isLast = nextIndex === items.length - 1;

                if (isFirst) {
                  content.scrollTo({ top: 0 });
                } else if (isLast) {
                  content.scrollTo({ top: content.scrollHeight });
                }
              }
            } else {
              onValueChange(nextItem.value);
            }

            event.preventDefault();
          }
        })}
      />
    </Popper.Anchor>
  );
};

SelectTrigger.displayName = DISPLAY_NAME;
