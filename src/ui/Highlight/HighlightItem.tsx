import { useContext, useCallback } from 'react';
import { type PolyProps, Poly } from '../polymorphic';
import { useMergedRefs } from '../hooks';
import { cn } from '../utils';
import { HighlightContext } from './highlightContext';
import classes from './highlightClasses';

export type HighlightItemProps = PolyProps<typeof Poly.div> & {
  selected?: boolean;
  disabled?: boolean;
};

export const HighlightItem = (inProps: HighlightItemProps) => {
  const { ref: refProp, selected, disabled, className, ...props } = inProps;

  const context = useContext(HighlightContext);
  const isHover = context?.type === 'hover';

  const ref = useCallback(
    (node: HTMLElement) => {
      if (context) {
        const { type, leaveMode, persistent, currentRef } = context;

        function handleEnable() {
          if (!disabled) {
            currentRef.current = node;
          }
        }

        function handleDisable() {
          if (!persistent) {
            currentRef.current = null;
          }
        }

        if (selected) {
          handleEnable();
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
      }
    },
    [context]
  );

  const mergedRefs = useMergedRefs(refProp, ref);

  return (
    <Poly.div
      ref={mergedRefs}
      data-highlight={isHover}
      className={cn(
        classes.item({
          hover: isHover,
        }),
        className
      )}
      {...props}
    />
  );
};
