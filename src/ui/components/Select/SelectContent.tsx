import { useEffect, useRef } from 'react';
import { useMergedRefs } from '@ui';
import { FocusTrap, Native, Popover, type NativeProps } from '@ui/headless';
import { cn, composeHandlers, createScopedContext } from '@ui/utils';
import { Select } from './Select';
import classes from './classes';

const DISPLAY_NAME = 'SelectContent';

type SelectContentContextValue = {
  onOptionLeave(): void;
};

const [SelectContentContext, useSelectContentContext] = createScopedContext<
  SelectContentContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type SelectContentProps = NativeProps<'div'>;

export const SelectContent = (inProps: SelectContentProps) => {
  const { ref: refProp, className, onKeyDown, ...props } = inProps;

  const ref = useRef<HTMLElement>(null);
  const mergedRef = useMergedRefs(refProp, ref);

  const { open } = Select.useContext(DISPLAY_NAME);
  const { getItems } = Select.useCollection();

  function handleOptionLeave() {
    //ref.current?.focus();
  }

  useEffect(() => {
    if (open) {
      const [first] = getItems().filter((item) => !item.disabled);
      first.node?.focus({ preventScroll: true });
    }
  }, [open]);

  return (
    <SelectContentContext onOptionLeave={handleOptionLeave}>
      <Popover.Content
        align="start"
        avoidCollisions
        className={cn(classes.dialog)}
      >
        <FocusTrap trapped={open} asChild>
          <Native.div
            ref={mergedRef}
            role="listbox"
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
    </SelectContentContext>
  );
};

SelectContent.displayName = DISPLAY_NAME;
SelectContent.useContext = useSelectContentContext;
