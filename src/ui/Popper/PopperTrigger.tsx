import { type ReactElement, type Ref, cloneElement, useContext } from 'react';
import PopperContext from './popperContext';
import { useMergedRefs } from '../hooks';

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

  const mergedRefs = useMergedRefs(
    popper.triggerRef,
    (children.props as PropsWithRef).ref
  );

  const props = {
    ref: mergedRefs,
  };

  return cloneElement(children, props);
};
