import {
  type ElementType,
  type ComponentPropsWithRef,
  useContext,
  useCallback,
} from 'react';
import { useMergedRefs } from '../hooks';
import { HighlightContext } from './highlightContext';

export type HighlightItemProps<T extends ElementType> = {
  as?: T;
  defaultSelected?: boolean;
  disabled?: boolean;
} & Omit<ComponentPropsWithRef<T>, 'as'>;

export const HighlightItem = <T extends ElementType = 'div'>(
  inProps: HighlightItemProps<T>
) => {
  const {
    as: Tag = 'div',
    ref: refProp,
    defaultSelected,
    disabled,
    ...props
  } = inProps;

  const context = useContext(HighlightContext);

  const ref = useCallback(
    (node: HTMLElement) => {
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
    },
    [context, defaultSelected]
  );

  const mergedRefs = useMergedRefs(refProp, ref);

  return <Tag ref={mergedRefs} {...props} />;
};
