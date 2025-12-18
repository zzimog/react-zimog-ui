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

const DISPLAY_NAME = 'Native';

type Props = Record<string, any>;

export type NativeProps<E extends ElementType> = ComponentPropsWithRef<E> & {
  as?: ElementType;
  asChild?: boolean;
};

type NativeTags = {
  [Tag in keyof JSX.IntrinsicElements]: (props: NativeProps<Tag>) => JSX.Element;
};

/**
 * @example
 *
 * type ComponentProps = NativeProps<'button'> & {
 *   prop?: any;
 * };
 *
 * const Component = (inProps: ComponentProps) => {
 *   const { prop, ...props } = inProps;
 *
 *   return <Native.button {...props} />;
 * };
 */
export const Native = tags.reduce((native, tag) => {
  const NativeElement = (inProps: NativeProps<typeof tag>) => {
    const { as, asChild, ...nativeProps } = inProps;
    const Comp: any = as || tag;

    if (asChild) {
      const { ref, children } = inProps;

      if (isValidElement(children)) {
        const child = Children.only(children);
        const childProps = child.props as Record<string, any>;
        const merged = mergeProps(nativeProps, childProps);

        if (children.type !== Fragment) {
          merged.ref = ref
            ? useMergedRefs(ref as any, childProps.ref)
            : childProps.ref;
        }

        return cloneElement(child, merged);
      }

      return null;
    }

    return <Comp {...nativeProps} />;
  };

  NativeElement.displayName = `${DISPLAY_NAME}.${tag}`;

  return {
    ...native,
    [tag]: NativeElement,
  };
}, {} as NativeTags);

function mergeProps(nativeProps: Props, childProps: Props) {
  const props = { ...childProps };

  for (const prop in childProps) {
    const nativePropValue = nativeProps[prop];
    const childPropValue = childProps[prop];

    // is an effect handler
    if (/^on[A-Z]/.test(prop)) {
      // merge if exists on both
      if (nativePropValue && childPropValue) {
        props[prop] = (...args: unknown[]) => {
          const result = childPropValue(...args);
          nativePropValue(...args);

          return result;
        };
      } else if (nativePropValue) {
        props[prop] = nativePropValue;
      }
    }

    // merge styles
    if (prop === 'style') {
      props[prop] = { ...nativePropValue, ...childPropValue };
    }

    // merge class names
    if (prop === 'className') {
      props[prop] = cn(nativePropValue, childPropValue);
    }
  }

  return { ...nativeProps, ...props };
}
