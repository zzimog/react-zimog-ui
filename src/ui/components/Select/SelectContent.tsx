import { useEffect, useRef } from 'react';
import { FocusTrap, Popover, type NativeProps } from '@ui/headless';
import { ScrollArea } from '@ui/components';
import { useMergedRefs } from '@ui/hooks';
import { cn, composeHandlers, createScopedContext } from '@ui/utils';
import { Select } from './Select';
import classes from './classes';

const DISPLAY_NAME = 'SelectContent';

type SelectContentContextValue = {};

const [SelectContentContext, useSelectContentContext] = createScopedContext<
  SelectContentContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type SelectContentProps = NativeProps<'div'>;

export const SelectContent = (inProps: SelectContentProps) => {
  const {
    ref: refProp,
    className,
    onContextMenu,
    onKeyDown,
    ...props
  } = inProps;

  const ref = useRef<HTMLElement>(null);
  const mergedRef = useMergedRefs(refProp, ref);

  const { open } = Select.useContext(DISPLAY_NAME);
  const { getItems } = Select.useCollection();

  /**
   * @todo Need to use a ref to the ScrollArea Viewport
   */
  /*
  useEffect(() => {
    function handleFocusIn(event: FocusEvent) {
      const node = ref.current;
      if (node) {
        const items = getItems()
          .filter((item) => !item.disabled)
          .map((item) => item.node);

        const [first] = items;
        const [last] = items.reverse();

        if (event.target === first) {
          node.scrollTop = 0;
        } else if (event.target === last) {
          node.scrollTop = node.scrollHeight;
        }
      }
    }

    document.addEventListener('focusin', handleFocusIn);
    return () => document.removeEventListener('focusin', handleFocusIn);
  }, []);
  */

  useEffect(() => {
    if (open) {
      const nodes = getItems()
        .filter((item) => !item.disabled)
        .map((item) => item.node);

      nodes[0].focus({ preventScroll: true });
    }
  }, [open]);

  return (
    <SelectContentContext>
      <Popover.Content
        asChild
        align="start"
        avoidCollisions
        className={cn(classes.dialog)}
      >
        <ScrollArea>
          <FocusTrap
            trapped={open}
            ref={mergedRef}
            role="listbox"
            {...props}
            className={cn(classes.content, className)}
            onContextMenu={composeHandlers(onContextMenu, (event) => {
              event.preventDefault();
            })}
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
        </ScrollArea>
      </Popover.Content>
    </SelectContentContext>
  );
};

SelectContent.displayName = DISPLAY_NAME;
SelectContent.useContext = useSelectContentContext;
