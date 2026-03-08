import type { ComponentPropsWithRef } from 'react';
import { Presence } from '../Presence';
import { Checkable } from './Checkable';

const DISPLAY_NAME = 'CheckableIndicator';

type PresenceProps = ComponentPropsWithRef<typeof Presence>;
type CheckableIndicatorProps = Omit<PresenceProps, 'present'>;

export const CheckableIndicator = (inProps: CheckableIndicatorProps) => {
  const { forceMount, ...props } = inProps;

  const { checked, disabled } = Checkable.useContext(DISPLAY_NAME);

  return (
    <Presence
      as="span"
      present={checked}
      forceMount={forceMount}
      hidden={forceMount ? false : undefined}
      data-checked={checked}
      data-disabled={disabled}
      {...props}
    />
  );
};

CheckableIndicator.displayName = DISPLAY_NAME;
