/**
 * Based on Radix UI Primitive component
 * Ref: https://github.com/radix-ui/primitives/blob/main/packages/react/primitive/src/primitive.tsx
 */

import {
  type JSX,
  type ElementType,
  type ComponentPropsWithRef,
  isValidElement,
  Children,
  Fragment,
  cloneElement,
} from 'react';
import { cn } from '../utils';
import { useMergedRefs } from '../hooks';
import { tags } from './tags';

type Props = Record<string, any>;

export type PolyProps<E extends ElementType> = ComponentPropsWithRef<E> & {
  as?: ElementType;
  asChild?: boolean;
};

type PolyTags = {
  [Tag in keyof JSX.IntrinsicElements]: (props: PolyProps<Tag>) => JSX.Element;
};

/**
 * @example
 *
 * type ComponentProps = PolyProps<'button'> & {
 *   prop?: any;
 * };
 *
 * const Component = (inProps: ComponentProps) => {
 *   const { prop, ...props } = inProps;
 *
 *   return <Poly.button {...props} />;
 * };
 */
export const Poly = tags.reduce((poly, tag) => {
  const PolyElement = (inProps: PolyProps<typeof tag>) => {
    const { as, asChild, ...polyProps } = inProps;
    const Comp: any = as || tag;

    if (asChild) {
      const { ref, children } = inProps;

      if (isValidElement(children)) {
        const child = Children.only(children);
        const childProps = child.props as Props;
        const merged = mergeProps(polyProps, childProps);

        if (children.type !== Fragment) {
          merged.ref = ref
            ? useMergedRefs(ref as any, childProps.ref)
            : childProps.ref;
        }

        return cloneElement(child, merged);
      }

      return null;
    }

    return <Comp {...polyProps} />;
  };

  return {
    ...poly,
    [tag]: PolyElement,
  };
}, {} as PolyTags);

function mergeProps(polyProps: Props, childProps: Props) {
  const props = { ...childProps };

  for (const prop in childProps) {
    const polyPropValue = polyProps[prop];
    const childPropValue = childProps[prop];

    // is an effect handler
    if (/^on[A-Z]/.test(prop)) {
      // merge if exists on both
      if (polyPropValue && childPropValue) {
        props[prop] = (...args: unknown[]) => {
          const result = childPropValue(...args);
          polyPropValue(...args);

          return result;
        };
      } else if (polyPropValue) {
        props[prop] = polyPropValue;
      }
    }

    // merge styles
    if (prop === 'style') {
      props[prop] = { ...polyPropValue, ...childPropValue };
    }

    // merge class names
    if (prop === 'className') {
      props[prop] = cn(polyPropValue, childPropValue);
    }
  }

  return { ...polyProps, ...props };
}
