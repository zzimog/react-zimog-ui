import {
  type ReactNode,
  type Ref,
  cloneElement,
  isValidElement,
  useContext,
} from 'react';
import { mergeRefs } from 'react-merge-refs';
import PopperContext from './popperContext';

type PropsWithRef = {
  ref?: Ref<HTMLElement>;
  [key: string]: unknown;
};

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

  const props = {
    ref: mergeRefs([popper.triggerRef, (children.props as PropsWithRef).ref]),
  };

  return cloneElement(children, props);
};
