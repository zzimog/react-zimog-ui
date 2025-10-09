import { Presence } from '../Presence';
import {
  type CollapsibleElementProps,
  CollapsibleElement,
} from './CollapsibleElement';

/**
 * Ref: https://github.com/radix-ui/primitives/blob/main/packages/react/collapsible/src/collapsible.tsx
 */

export type CollapsibleProps = Omit<CollapsibleElementProps, 'present'>;

export const Collapsible = (inProps: CollapsibleProps) => {
  const { open, ...props } = inProps;

  return (
    <Presence present={open}>
      {({ present }) => (
        <CollapsibleElement {...props} present={present} open={open} />
      )}
    </Presence>
  );
};
