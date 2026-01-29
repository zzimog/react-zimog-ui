import { FocusTrap, Native, Popover, type NativeProps } from '@ui/headless';
import { cn, composeHandlers } from '@ui/utils';
import { Select } from './Select';
import classes from './classes';

const DISPLAY_NAME = 'SelectContent';

type SelectContentProps = NativeProps<'div'>;

export const SelectContent = (inProps: SelectContentProps) => {
  const { className, onKeyDown, ...props } = inProps;

  const { getItems } = Select.useCollection();

  return (
    <Popover.Content align="start" asChild>
      <FocusTrap asChild>
        <Native.div
          {...props}
          className={cn(classes.content, className)}
          onKeyDown={composeHandlers(onKeyDown, (event) => {
            if (event.key === 'Tab') {
              event.preventDefault();
            }

            if (['Home', 'End', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
              const nodes = getItems()
                .filter((item) => !item.disabled)
                .map((item) => item.node);

              let [nextNode] = nodes;

              if (['ArrowUp', 'End'].includes(event.key)) {
                [nextNode] = nodes.reverse();
              }

              if (['ArrowUp', 'ArrowDown'].includes(event.key)) {
                const currentActive = event.target as HTMLElement;
                const currentIndex = nodes.indexOf(currentActive);
                [nextNode] = nodes.slice(currentIndex + 1);
              }

              nextNode?.focus();
              event.preventDefault();
            }
          })}
        />
      </FocusTrap>
    </Popover.Content>
  );
};

SelectContent.displayName = DISPLAY_NAME;
