import {
  type ReactElement,
  type RefAttributes,
  Children,
  cloneElement,
} from 'react';
import { useMergedRefs } from '../hooks';
import { usePresence } from './use-presence';

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

  const ref = useMergedRefs(presence.ref, child.props.ref);

  return typeof children === 'function' || presence.isPresent
    ? cloneElement(child, { ref })
    : null;
};
