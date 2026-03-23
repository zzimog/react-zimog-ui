import { useLayoutEffect, useState } from 'react';
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

  const { open, onContentChange } = Select.useContext(DISPLAY_NAME);

  const [mounted, setMounted] = useState(open);
  const [fragment] = useState<DocumentFragment | undefined>(() => {
    if (typeof DocumentFragment === 'function') {
      return new DocumentFragment();
    }
  });

  const mergedRef = useMergedRefs(refProp, onContentChange);

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (open) setMounted(true);
  }, [open]);

  if (!open && !mounted) {
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
        data-open={open}
        avoidCollisions
        className={cn(classes.dialog)}
        onAnimationEnd={() => {
          if (!open) setMounted(false);
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
