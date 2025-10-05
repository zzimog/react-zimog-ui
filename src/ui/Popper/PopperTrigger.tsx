import { type ReactElement, type Ref, cloneElement, useContext } from 'react';
import { mergeRefs } from 'react-merge-refs';
import PopperContext from './popperContext';

type PropsWithRef = {
  ref?: Ref<HTMLElement>;
  [key: string]: unknown;
};

export type PopperTriggerProps = {
  children: ReactElement;
};

export const PopperTrigger = (inProps: PopperTriggerProps) => {
  const { children } = inProps;
  const popper = useContext(PopperContext);

  if (!popper) {
    throw new Error('PopperTrigger must be used inside PopperContext');
  }

  const props = {
    ref: mergeRefs([popper.triggerRef, (children.props as PropsWithRef).ref]),
  };

  return cloneElement(children, props);
};
