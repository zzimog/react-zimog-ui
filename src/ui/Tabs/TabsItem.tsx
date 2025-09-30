import { useId, type ElementType, type HTMLAttributes } from 'react';

export type TabsItemProps = {
  as?: ElementType;
  title: string;
  active?: boolean;
} & HTMLAttributes<HTMLElement>;

export const TabsItem = (inProps: TabsItemProps) => {
  const { as: Tag = 'div', id: propId, ...props } = inProps;

  const id = useId();

  return <Tag id={propId || id} role="tabpanel" {...props} />;
};
