import { memo } from 'react';
import { Presence } from '../Presence';
import {
  type CollapsibleElementProps,
  CollapsibleElement,
} from './CollapsibleElement';

/**
 * Ref: https://github.com/radix-ui/primitives/blob/main/packages/react/collapsible/src/collapsible.tsx
 */

const CollapsibleMemo = memo(CollapsibleElement);

export type CollapsibleProps = Omit<CollapsibleElementProps, 'present'>;

export const Collapsible = (inProps: CollapsibleProps) => {
  const { open, ...props } = inProps;

  return (
    <Presence present={open}>
      {({ present }) => (
        <CollapsibleMemo {...props} present={present} open={open} />
      )}
    </Presence>
  );
};
