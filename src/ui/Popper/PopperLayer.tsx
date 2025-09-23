import { type ElementType, type HTMLAttributes, useContext } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../utils';
import PopperContext from './popperContext';

export type LayerProps = {
  as?: ElementType;
} & HTMLAttributes<HTMLElement>;

export const PopperLayer = (inProps: LayerProps) => {
  const { as, className, ...props } = inProps;

  const Tag = as || 'div';

  const popper = useContext(PopperContext);

  if (!popper) {
    throw new Error('PopperLayer must be used inside PopperContext');
  }

  if (!popper.layerOpen) {
    return null;
  }

  return createPortal(
    <Tag
      ref={popper.layerRef}
      className={cn(
        'p-2',
        'rounded-md',
        'border',
        'border-gray-500/20',
        'bg-gray-200',
        'dark:bg-gray-800',
        'shadow-xs',
        className
      )}
      {...props}
    />,
    document.body
  );
};
