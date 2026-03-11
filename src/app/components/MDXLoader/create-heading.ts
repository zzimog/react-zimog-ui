import { createElement, type ComponentProps } from 'react';
import { cn } from '@ui';

type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingProps<T extends HeadingType> = ComponentProps<T>;

export function createHeading<T extends HeadingType>(
  heading: T,
  inProps: HeadingProps<T>
) {
  const { className, children, ...props } = inProps;

  const isString = typeof children === 'string';
  const isHidden = isString && children.startsWith?.('~');
  const content = isHidden ? children.slice(1) : children;

  return createElement(heading, {
    ...props,
    className: cn(isHidden && 'sr-only', className),
    children: content,
  });
}
