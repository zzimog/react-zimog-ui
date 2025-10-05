import { type ReactNode, Children, isValidElement } from 'react';
import { InteractiveItem } from './InteractiveItem';

export type InteractiveProps = {
  value?: number;
  type?: 'hover' | 'focus' | 'click';
  children: ReactNode;
  onInteraction?(node: HTMLElement): void;
};

export const Interactive = (inProps: InteractiveProps) => {
  const { value, children, ...props } = inProps;

  return Children.map(children, (child, index) => {
    if (!isValidElement(child)) {
      return null;
    }

    const isActive = index === value;

    return (
      <InteractiveItem active={isActive} {...props}>
        {child}
      </InteractiveItem>
    );
  });
};
