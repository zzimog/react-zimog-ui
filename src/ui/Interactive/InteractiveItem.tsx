import {
  type ReactElement,
  type RefAttributes,
  useRef,
  useEffect,
  cloneElement,
  isValidElement,
} from 'react';
import { mergeRefs } from 'react-merge-refs';

export type InteractiveItemProps = {
  active?: boolean;
  type?: 'hover' | 'focus' | 'click';
  children: ReactElement;
  onInteraction?(node: HTMLElement): void;
};

export const InteractiveItem = (inProps: InteractiveItemProps) => {
  const {
    active = false,
    type = 'click',
    children: child,
    onInteraction,
  } = inProps;

  const ref = useRef<HTMLElement>(null);

  const childProps = child.props as RefAttributes<unknown>;

  const props = {
    ...childProps,
    ref: mergeRefs([childProps.ref, ref]),
  };

  const eventType = type === 'hover' ? 'mouseover' : type;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    function handleEvent() {
      onInteraction?.(node!);
    }

    if (active) {
      handleEvent();
    }

    node.addEventListener(eventType, handleEvent);
    return () => node.removeEventListener(eventType, handleEvent);
  }, [active, eventType, onInteraction]);

  if (!isValidElement(child)) {
    return null;
  }

  return cloneElement(child, props);
};
