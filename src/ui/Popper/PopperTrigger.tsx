import {
  type ReactNode,
  cloneElement,
  isValidElement,
  useContext,
} from 'react';
import PopperContext from './popperContext';

export type PopperTriggerProps = {
  children: ReactNode;
};

export const PopperTrigger = (inProps: PopperTriggerProps) => {
  const { children } = inProps;
  const popper = useContext(PopperContext);

  if (!popper) {
    throw new Error('PopperTrigger must be used inside PopperContext');
  }

  if (!isValidElement(children)) {
    return null;
  }

  const props = { ref: popper.triggerRef };

  return cloneElement(children, props);
};
