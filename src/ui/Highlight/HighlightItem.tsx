import { useContext, useCallback } from 'react';
import { poly } from '../polymorphic';
import { useMergedRefs } from '../hooks';
import { HighlightContext } from './highlightContext';

export type HighlightItemProps = {
  selected?: boolean;
  disabled?: boolean;
};

export const HighlightItem = poly.div<HighlightItemProps>((Tag, inProps) => {
  const { ref: refProp, selected, disabled, ...props } = inProps;

  const context = useContext(HighlightContext);

  const ref = useCallback(
    (node: HTMLElement) => {
      if (context) {
        const { type, persistent, currentRef } = context;

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
            node.addEventListener('mouseleave', handleDisable);
            return () => {
              node.removeEventListener('mouseover', handleEnable);
              node.removeEventListener('mouseleave', handleDisable);
            };
        }
      }
    },
    [context]
  );

  const mergedRefs = useMergedRefs(refProp, ref);

  return <Tag ref={mergedRefs} {...props} />;
});
