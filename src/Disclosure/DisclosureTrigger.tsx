import type {
  ElementType,
  HTMLAttributes,
  MouseEvent as ReactMouseEvent,
} from 'react';
import useDisclosure from './useDisclosure';

export type DisclosureTriggerProps = {
  as?: ElementType;
  value: string;
} & HTMLAttributes<HTMLElement>;

export const DisclosureTrigger = (inProps: DisclosureTriggerProps) => {
  const { as: Tag = 'div', value: valueProp, onClick, ...props } = inProps;

  const { triggerId, contentId, isActive, setValue } = useDisclosure({
    valueProp,
  });

  function handleClick(event: ReactMouseEvent<HTMLElement, MouseEvent>) {
    onClick?.(event);
    setValue(valueProp);
  }

  return (
    <Tag
      id={triggerId}
      aria-controls={contentId}
      aria-expanded={isActive}
      onClick={handleClick}
      {...props}
    />
  );
};
