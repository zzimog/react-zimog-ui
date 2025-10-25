/**
 * Based on Radix UI Primitive component
 * Ref: https://github.com/radix-ui/primitives/blob/main/packages/react/primitive/src/primitive.tsx
 */

import type { JSX, ElementType, ComponentPropsWithRef } from 'react';
import { tags } from './tags';

type PolyTags = {
  [Tag in keyof JSX.IntrinsicElements]: (props: PolyProps<Tag>) => JSX.Element;
};

export type PolyProps<E extends ElementType> = ComponentPropsWithRef<E> & {
  as?: ElementType;
};

/**
 * @example
 *
 * type ComponentProps = PolyProps<typeof Poly.button> & {
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
    const { as, ...props } = inProps;
    const Comp: any = as || tag;

    return <Comp {...props} />;
  };
  return {
    ...poly,
    [tag]: PolyElement,
  };
}, {} as PolyTags);
