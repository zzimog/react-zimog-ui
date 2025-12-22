import type { ComponentProps } from 'react';
import { Collapsible } from '@ui/headless';
import { useDisclosureContext, useDisclosureItemContext } from './context';

const DISPLAY_NAME = 'DisclosureContent';

type BaseProps = ComponentProps<typeof Collapsible.Element>;
type DisclosureContentProps = BaseProps & {
  value?: string;
};

export const DisclosureContent = (inProps: DisclosureContentProps) => {
  const { value: valueProp, ...props } = inProps;

  const context = useDisclosureContext(DISPLAY_NAME);
  const itemContext = useDisclosureItemContext(DISPLAY_NAME);

  const value = valueProp || itemContext.value;
  const open = !!value && context.value.includes(value);

  return <Collapsible.Element open={open} {...props} />;
};

DisclosureContent.displayName = DISPLAY_NAME;
