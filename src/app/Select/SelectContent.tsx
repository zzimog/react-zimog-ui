import { useRef } from 'react';
import { useMergedRefs } from '@ui';
import { FocusTrap, type NativeProps } from '@ui/headless';
import { cn, composeHandlers, createScopedContext } from '@ui/utils';
import { Select } from './Select';
import { useHighlight } from './use-highlight';
import classes from './classes';

const DISPLAY_NAME = 'SelectContent';

type SelectContentContextValue = {
  onItemFocus(element: HTMLElement | null): void;
  onItemLeave(): void;
};

const [SelectContentContext, useSelectContentContext] = createScopedContext<
  SelectContentContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type SelectContentProps = NativeProps<'div'>;

export const SelectContent = (inProps: SelectContentProps) => {
  const { ref: refProp, className, style, onKeyDown, ...props } = inProps;

  /*const context =*/ Select.useContext(DISPLAY_NAME);

  const [rootRef, highlightRef, handleItemFocus] = useHighlight();

  const ref = useRef<HTMLElement>(null);
  const mergedRef = useMergedRefs(refProp, ref);

  return (
    <SelectContentContext
      onItemFocus={handleItemFocus}
      onItemLeave={() => ref.current?.focus()}
    >
      <div ref={rootRef as any} className="relative">
        <div
          ref={highlightRef as any}
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
          loop
          {...props}
          className={cn(classes.content, className)}
          style={{
            outline: 'none',
            ...style,
          }}
          onKeyDown={composeHandlers(onKeyDown, (event) => {
            if (event.key === 'Tab') event.preventDefault();
          })}
        />
      </div>
    </SelectContentContext>
  );
};

SelectContent.displayName = DISPLAY_NAME;
SelectContent.useContext = useSelectContentContext;
