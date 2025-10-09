import type { PropsWithChildren } from 'react';
import { type PopperOptions, usePopper } from '../hooks/usePopper';
import PopperContext from './popperContext';
import { PopperTrigger } from './PopperTrigger';
import { PopperLayer } from './PopperLayer';

export type PopperProps = PropsWithChildren<PopperOptions>;

export const Popper = (inProps: PopperProps) => {
  const { open, distance, flip, position, children } = inProps;

  const popper = usePopper({
    open,
    distance,
    flip,
    position,
  });

  return <PopperContext value={popper}>{children}</PopperContext>;
};

Popper.Trigger = PopperTrigger;
Popper.Layer = PopperLayer;
