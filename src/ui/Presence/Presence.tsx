/**
 * Based on Radix UI usePresence hook
 * Ref: https://github.com/radix-ui/primitives/blob/main/packages/react/presence/src/presence.tsx
 */

import {
  type ReactElement,
  type RefAttributes,
  Children,
  cloneElement,
} from 'react';
import { usePresence, useMergedRefs } from '../hooks';

export type PresenceProps = {
  present?: boolean;
  children: ReactElement | ((props: { present: boolean }) => ReactElement);
};

export const Presence = (inProps: PresenceProps) => {
  const { present = true, children } = inProps;
  const presence = usePresence(present);

  const child = (
    typeof children === 'function'
      ? children({ present: presence.present })
      : Children.only(children)
  ) as ReactElement<RefAttributes<HTMLElement>>;

  const ref = useMergedRefs(child.props.ref, presence.ref);

  return typeof children === 'function' || presence.present
    ? cloneElement(child, { ref })
    : null;
};
