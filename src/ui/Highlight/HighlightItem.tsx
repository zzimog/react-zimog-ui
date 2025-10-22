import { useContext, useCallback } from 'react';
import { useMergedRefs } from '../hooks';
import { HighlightContext } from './highlightContext';
import { poly } from '../polymorphic';

export type HighlightItemProps = {
  defaultSelected?: boolean;
  disabled?: boolean;
};

export const HighlightItem = poly.div<HighlightItemProps>((Tag, inProps) => {
  const { ref: refProp, defaultSelected, disabled, ...props } = inProps;

  const context = useContext(HighlightContext);

  const ref = useCallback((node: HTMLElement) => {
    if (context) {
      const { type, setNode } = context;
      const eventType = type === 'hover' ? 'mouseover' : type;

      function handler() {
        if (!disabled) {
          setNode(node);
        }
      }

      if (defaultSelected) {
        handler();
      }

      node.addEventListener(eventType, handler);
      return () => node.removeEventListener(eventType, handler);
    }
  }, []);

  const mergedRefs = useMergedRefs(refProp, ref);

  return <Tag ref={mergedRefs} {...props} />;
});
