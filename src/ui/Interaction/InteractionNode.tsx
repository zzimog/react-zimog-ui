import {
  type ElementType,
  type ComponentPropsWithRef,
  useContext,
  useCallback,
} from 'react';
import { useMergedRefs } from '../hooks';
import { InteractionContext } from './interactionContext';

export type InteractionNodeProps<T extends ElementType> = {
  as?: T;
  defaultSelected?: boolean;
  disabled?: boolean;
} & Omit<ComponentPropsWithRef<T>, 'as'>;

export const InteractionNode = <T extends ElementType = 'div'>(
  inProps: InteractionNodeProps<T>
) => {
  const { as: Tag = 'div', ref: refProp, defaultSelected, ...props } = inProps;

  const context = useContext(InteractionContext);

  const ref = useCallback(
    (node: HTMLElement) => {
      if (context) {
        const { type, setNode } = context;
        const eventType = type === 'hover' ? 'mouseover' : type;
        const handler = () => setNode(node);

        if (defaultSelected) {
          setNode(node);
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
