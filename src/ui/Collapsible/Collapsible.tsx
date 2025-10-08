import type { ElementType, HTMLAttributes, RefAttributes } from 'react';
import { Presence } from '../Presence';
import { CollapsibleElement } from './CollapsibleElement';

export type CollapsibleProps = {
  as?: ElementType;
  open?: boolean;
} & HTMLAttributes<HTMLElement> &
  RefAttributes<HTMLElement>;

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
