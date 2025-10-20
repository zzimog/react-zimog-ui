import { useCallback } from 'react';
import { useHighlightContext } from './highlightContext';

/**
 * @todo Refactor
 */
import { poly } from '../../ui/polymorphic';
import { useMergedRefs } from '../../ui/hooks';
import { cn } from '../../ui/utils';

export type HighlightItemProps = {
  selected?: boolean;
  disabled?: boolean;
};

export const HighlightItem = poly.div<HighlightItemProps>((Tag, inProps) => {
  const { ref: refProp, selected, disabled, className, ...props } = inProps;

  const clsx = 'w-fit p-4 border border-black';

  const context = useHighlightContext();

  const ref = useCallback(
    (node: HTMLElement) => {
      const { type, setCurrent } = context;
      const eventType = type === 'hover' ? 'mouseover' : type;

      function handleEvent() {
        if (!disabled) {
          setCurrent(node);
        }
      }

      if (selected) {
        handleEvent();
      }

      node.addEventListener(eventType, handleEvent);
      return () => node.removeEventListener(eventType, handleEvent);
    },
    [disabled, context]
  );

  const mergedRefs = useMergedRefs(refProp, ref);

  return <Tag ref={mergedRefs} className={cn(clsx, className)} {...props} />;
});
