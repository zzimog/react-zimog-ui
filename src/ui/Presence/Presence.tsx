import {
  type ReactElement,
  type RefAttributes,
  useState,
  useRef,
  Children,
  useLayoutEffect,
  cloneElement,
} from 'react';
import { useMergedRefs } from '../hooks';

type PresenceState = 'mounted' | 'animating' | 'unmounted';

export type PresenceProps = {
  present?: boolean;
  children: ReactElement | ((props: { present: boolean }) => ReactElement);
};

export const Presence = (inProps: PresenceProps) => {
  const { present = true, children } = inProps;

  const initialState = present ? 'mounted' : 'unmounted';
  const [state, setState] = useState<PresenceState>(initialState);

  const ref = useRef<HTMLElement>(null);

  const stylesRef = useRef<CSSStyleDeclaration>(null);

  const isPresent = state !== 'unmounted';

  const child = (
    typeof children === 'function'
      ? children({ present: isPresent })
      : Children.only(children)
  ) as ReactElement<RefAttributes<HTMLElement>>;

  const childProps = child.props;
  const mergedRefs = useMergedRefs<HTMLElement>(childProps.ref, ref);

  useLayoutEffect(() => {
    const node = ref.current!;
    let timeout: number;

    stylesRef.current = stylesRef.current || getComputedStyle(node);

    if (present) {
      setState('mounted');
    } else {
      const { animationName, display } = stylesRef.current;
      const isVisible = display !== 'none';
      const hasAnimation = animationName !== 'none';

      if (isVisible && hasAnimation) {
        setState('animating');
      } else {
        setState('unmounted');
      }
    }

    function handleAnimationEnd() {
      if (!present) {
        setState('unmounted');

        const currentFill = node.style.animationFillMode;
        node.style.animationFillMode = 'forwards';

        /**
         * Prevent flashes when unmounting after
         * animation end event. Cannot use
         * requestAnimationFrame because it
         * executes too soon.
         */
        timeout = setTimeout(() => {
          if (node.style.animationFillMode === 'forwards') {
            node.style.animationFillMode = currentFill;
          }
        });
      }
    }

    node.addEventListener('animationcancel', handleAnimationEnd);
    node.addEventListener('animationend', handleAnimationEnd);

    return () => {
      clearTimeout(timeout);
      node.removeEventListener('animationcancel', handleAnimationEnd);
      node.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [present]);

  return typeof children === 'function' || isPresent
    ? cloneElement(child, { ref: mergedRefs })
    : null;
};
