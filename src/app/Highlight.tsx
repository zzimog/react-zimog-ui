import {
  type ElementType,
  type HTMLAttributes,
  type RefAttributes,
} from 'react';
import { cn, usePresence } from '@ui';

const classes = [
  'absolute z-1',
  'rounded-md',
  'bg-red-500',
  'transition-all',
  'animate-fade-out',
  'group-hover:animate-fade-in',
];

export type HighlightProps = {
  as?: ElementType;
  visible?: boolean;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
} & HTMLAttributes<HTMLElement> &
  RefAttributes<HTMLElement>;

export const Highlight = (inProps: HighlightProps) => {
  const {
    as: Tag = 'div',
    visible: visibleProp = false,
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    ...props
  } = inProps;

  const { ref, isPresent } = usePresence(visibleProp);
  const visible = visibleProp || isPresent;

  return (
    <Tag
      {...props}
      ref={ref}
      className={cn(classes, props.className)}
      style={{
        ...props.style,
        width: `${width}px`,
        height: `${height}px`,
        transform: `translate(${x}px, ${y}px)`,
      }}
      hidden={!visible}
    />
  );
};
