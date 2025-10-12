import type { ElementType, ReactNode } from 'react';

export type AccordionTriggerProps = {
  as?: ElementType;
  children: ReactNode;
};

export const AccordionTrigger = (inProps: AccordionTriggerProps) => {
  const { as: Tag = 'button', children } = inProps;

  return <Tag>{children}</Tag>;
};
