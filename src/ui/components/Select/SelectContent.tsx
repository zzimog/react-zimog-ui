import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Native, Popper, type NativeProps } from '@ui/headless';
import { useMergedRefs } from '@ui/hooks';
import { cn, createScopedContext } from '@ui/utils';
import { Select } from './Select';
import classes from './classes';

const DISPLAY_NAME = 'SelectContent';

type SelectContentContextValue = object;

const [SelectContentContext, useSelectContentContext] = createScopedContext<
  SelectContentContextValue | undefined
>(DISPLAY_NAME, undefined);

/*---------------------------------------------------------------------------*/

type BaseProps = NativeProps<'div'>;
type SelectContentProps = BaseProps;

export const SelectContent = (inProps: SelectContentProps) => {
  const { ref: refProp, className, ...props } = inProps;

  const context = Select.useContext(DISPLAY_NAME);
  const { open, onContentChange } = context;

  const [isPlaced, setIsPlaced] = useState(open);
  const [fragment] = useState<DocumentFragment | undefined>(() => {
    if (typeof DocumentFragment === 'function') {
      return new DocumentFragment();
    }
  });

  const ref = useRef<HTMLElement>(null);
  const mergedRef = useMergedRefs(refProp, ref, onContentChange);

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (open) setIsPlaced(true);
  }, [open]);

  if (!open && !isPlaced) {
    return fragment
      ? createPortal(
          <SelectContentContext>{props.children}</SelectContentContext>,
          fragment
        )
      : null;
  }

  return (
    <SelectContentContext>
      <Popper.Content
        present={open}
        align="start"
        avoidCollisions
        data-open={open}
        className={cn(classes.dialog)}
        onAnimationEnd={() => {
          if (!open) setIsPlaced(false);
        }}
      >
        <Native.div
          ref={mergedRef}
          role="listbox"
          {...props}
          className={cn(classes.content, className)}
        />
      </Popper.Content>
    </SelectContentContext>
  );
};

SelectContent.displayName = DISPLAY_NAME;
SelectContent.useContext = useSelectContentContext;
