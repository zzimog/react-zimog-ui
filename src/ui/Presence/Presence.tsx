import {
  type ReactElement,
  type RefAttributes,
  Children,
  cloneElement,
} from 'react';
import { usePresence, useMergedRefs } from '../hooks';

/**
 * Ref: https://github.com/radix-ui/primitives/blob/main/packages/react/presence/src/presence.tsx
 */

export type PresenceProps = {
  present?: boolean;
  children: ReactElement | ((props: { present: boolean }) => ReactElement);
};

export const Presence = (inProps: PresenceProps) => {
  const { present = true, children } = inProps;
  const presence = usePresence(present);

  const child = (
    typeof children === 'function'
      ? children({ present: presence.isPresent })
      : Children.only(children)
  ) as ReactElement<RefAttributes<HTMLElement>>;

  const ref = useMergedRefs(child.props.ref, presence.ref);

  return typeof children === 'function' || presence.isPresent
    ? cloneElement(child, { ref })
    : null;
};
