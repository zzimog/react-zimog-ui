/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type HTMLAttributes,
  type ReactNode,
  cloneElement,
  isValidElement,
  useRef,
} from 'react';
import { cn } from '@ui/utils';

export type PopoverProps = HTMLAttributes<HTMLElement>;

export type PopoverTriggerProps = {
  children?: ReactNode;
};

export const Popover = (inProps: PopoverProps) => {
  const { className, children, ...props } = inProps;

  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
};

const PopoverTrigger = ({ children }: PopoverTriggerProps) => {
  const triggerRef = useRef(null);

  if (!isValidElement(children)) {
    return null;
  }

  return cloneElement(children, {
    ref: (ref: any) => (triggerRef.current = ref),
  } as any);
};

Popover.Trigger = PopoverTrigger;
