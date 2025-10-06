import type { ElementType, HTMLAttributes } from 'react';
import { Presence } from '../Presence';
import useDisclosure from './useDisclosure';

export type DisclosureContentProps = {
  as?: ElementType;
  value: string;
} & HTMLAttributes<HTMLElement>;

export const DisclosureContent = (inProps: DisclosureContentProps) => {
  const { as = 'div', value: valueProp, ...props } = inProps;

  const { triggerId, contentId, isActive } = useDisclosure({
    valueProp,
  });

  return (
    <Presence
      as={as}
      open={isActive}
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      {...props}
    />
  );
};
