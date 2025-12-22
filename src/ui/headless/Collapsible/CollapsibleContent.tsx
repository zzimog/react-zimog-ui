import type { ComponentProps } from 'react';
import { Presence } from '@ui/headless';
import { CollapsibleElement } from './CollapsibleElement';
import { useCollapsibleContext } from './context';

const DISPLAY_NAME = 'CollapsibleContent';

type PresenceProps = Omit<ComponentProps<typeof Presence>, 'present'>;
type CollapsibleContentProps = PresenceProps;

export const CollapsibleContent = (inProps: CollapsibleContentProps) => {
  const { ...props } = inProps;

  const { open } = useCollapsibleContext(DISPLAY_NAME);

  return <CollapsibleElement open={open} {...props} />;
};

CollapsibleContent.displayName = DISPLAY_NAME;
