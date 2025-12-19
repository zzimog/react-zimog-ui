import { useCallback } from 'react';
import { useMergedRefs } from '../hooks';
import { type NativeProps, Native } from '../Native';
import { cn } from '../utils';
import classes from './highlightClasses';
import { useHighlightContext } from './highlightContext';

const DISPLAY_NAME = 'HighlightItem';

export type HighlightItemProps = NativeProps<typeof Native.div> & {
  selected?: boolean;
  disabled?: boolean;
};

export const HighlightItem = (inProps: HighlightItemProps) => {
  const { ref: refProp, selected, disabled, className, ...props } = inProps;

  const context = useHighlightContext(DISPLAY_NAME);
  const isHover = context.type === 'hover';

  const ref = useCallback(
    (node: HTMLElement) => {
      const { type, leaveMode, persistent, onCurrentChange } = context;

      if (disabled) {
        return;
      }

      function handleEnable(event: Event) {
        if (event.target === node) {
          onCurrentChange(node);
        }
      }

      function handleDisable(event: Event) {
        if (event.target === node && !persistent) {
          onCurrentChange(null);
        }
      }

      if (selected) {
        onCurrentChange(node);
      }

      switch (type) {
        case 'click':
          node.addEventListener('click', handleEnable);
          return () => node.removeEventListener('click', handleEnable);

        case 'focus':
          node.addEventListener('focus', handleEnable);
          node.addEventListener('blur', handleDisable);
          return () => {
            node.removeEventListener('focus', handleEnable);
            node.removeEventListener('blur', handleDisable);
          };

        case 'hover':
          node.addEventListener('mouseover', handleEnable);
          if (leaveMode === 'items') {
            node.addEventListener('mouseleave', handleDisable);
          }
          return () => {
            node.removeEventListener('mouseover', handleEnable);
            if (leaveMode === 'items') {
              node.removeEventListener('mouseleave', handleDisable);
            }
          };
      }
    },
    [context]
  );

  const mergedRefs = useMergedRefs(refProp, ref);

  return (
    <Native.div
      ref={mergedRefs}
      data-highlight="item"
      {...props}
      className={cn(
        classes.item({
          hover: isHover,
        }),
        className
      )}
    />
  );
};

HighlightItem.displayName = DISPLAY_NAME;
