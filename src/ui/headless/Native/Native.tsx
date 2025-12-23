/**
 * Based on Radix UI Primitive component
 * Ref: https://github.com/radix-ui/primitives/blob/main/packages/react/primitive/src/primitive.tsx
 */
import {
  Children,
  cloneElement,
  Fragment,
  isValidElement,
  type ComponentPropsWithRef,
  type ElementType,
  type JSX,
  type ReactNode,
} from 'react';
import { useMergedRefs } from '@ui/hooks';
import { mergeProps } from './merge-props';
import { tags } from './tags';

type NativeBaseProps = {
  as?: ElementType;
  asChild?: boolean;
};

export type NativeProps<E extends ElementType> = ComponentPropsWithRef<E> &
  NativeBaseProps;

export type NativePropsWithRender<E extends ElementType, P extends {}> = Omit<
  NativeProps<E>,
  'children'
> & {
  children?: ReactNode | ((props: P) => ReactNode);
};

type NativeTags = {
  [Tag in keyof JSX.IntrinsicElements]: (
    props: NativeProps<Tag>
  ) => JSX.Element;
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
  const Element = (inProps: NativeProps<typeof tag>) => {
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

  Element.displayName = `Native.${tag}`;

  return {
    ...native,
    [tag]: Element,
  };
}, {} as NativeTags);
