import { useEffect, useRef } from 'react';
import { useMergedRefs } from '@ui';
import { FocusTrap, type NativeProps } from '@ui/headless';
import { cn, composeHandlers, createScopedContext } from '@ui/utils';
import { Select } from './Select';
import { useCollection, type CollectionCallback } from './use-collection';
import { useHighlight, type HighlightCallback } from './use-highlight';
import classes from './classes';

const DISPLAY_NAME = 'SelectContent';

type SelectContentContextValue = {
  onItemLeave(): void;
  // Collection
  onItemAdd: CollectionCallback;
  onItemRemove: CollectionCallback;
  // Highlight
  onItemFocus: HighlightCallback;
};

const [SelectContentContext, useSelectContentContext] = createScopedContext<
  SelectContentContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type SelectContentProps = NativeProps<'div'>;

export const SelectContent = (inProps: SelectContentProps) => {
  const { ref: refProp, className, onKeyDown, ...props } = inProps;

  /*const context =*/ Select.useContext(DISPLAY_NAME);

  const { getItems, addItem, removeItem } = useCollection();
  const [rootRef, highlightRef, handleItemFocus] = useHighlight();

  const ref = useRef<HTMLElement>(null);
  const mergedRef = useMergedRefs(refProp, ref);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <SelectContentContext
      onItemLeave={() => ref.current?.focus()}
      onItemAdd={addItem}
      onItemRemove={removeItem}
      onItemFocus={handleItemFocus}
    >
      <div className="h-50 overflow-auto">
        <div ref={rootRef} className="relative">
          <div
            ref={highlightRef}
            hidden
            className={[
              'absolute top-0 right-2 z-0',
              'translate-y-(--y)',
              'w-(--width)',
              'h-(--height)',
              'bg-red-500',
              'transition-transform',
            ].join(' ')}
          />
          <FocusTrap
            ref={mergedRef}
            {...props}
            className={cn(classes.content, className)}
            onMouseLeave={() => handleItemFocus(null)}
            onKeyDown={composeHandlers(onKeyDown, (event) => {
              if (event.key === 'Tab') event.preventDefault();

              if (['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
                const items = getItems();

                const currentElement = document.activeElement as HTMLElement;
                const currentIndex = items.indexOf(currentElement);
                let next: HTMLElement | null = null;

                if (event.key === 'Home') {
                  next = items[0];
                }

                if (event.key === 'End') {
                  next = items.reverse()[0];
                }

                if (event.key === 'ArrowUp') {
                  next = items[currentIndex - 1];
                  if (currentIndex === -1) {
                    next = items.reverse()[0];
                  }
                }

                if (
                  event.key === 'ArrowDown' &&
                  currentIndex < items.length - 1
                ) {
                  next = items[currentIndex + 1];
                  if (currentIndex === -1) {
                    next = items[0];
                  }
                }

                next?.focus();
                event.preventDefault();
              }
            })}
          />
        </div>
      </div>
    </SelectContentContext>
  );
};

SelectContent.displayName = DISPLAY_NAME;
SelectContent.useContext = useSelectContentContext;
