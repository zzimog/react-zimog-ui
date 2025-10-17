import type { ComponentPropsWithRef, ElementType, JSX } from 'react';

export type PolyProps<T extends ElementType, P extends object = {}> = {
  as?: T;
} & P &
  Omit<ComponentPropsWithRef<T>, 'as'>;

export type RenderPoly<T extends ElementType, P extends object = {}> = (
  Tag: T,
  props: P & Omit<ComponentPropsWithRef<T>, 'as'>
) => JSX.Element;

export interface CreatePolyElement<T extends ElementType> {
  <P extends object = {}>(render: RenderPoly<T, P>): <
    E extends ElementType = T
  >(
    props: PolyProps<E, P>
  ) => JSX.Element;
}

export interface CreatePoly {
  <T extends ElementType>(tag: T): CreatePolyElement<T>;
}
