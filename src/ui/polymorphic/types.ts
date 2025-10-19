import type { ElementType, ComponentPropsWithRef, JSX } from 'react';

export type PolyProps<T extends ElementType, P extends object = {}> = {
  as?: T;
} & P &
  Omit<ComponentPropsWithRef<T>, 'as'>;

export interface RenderPoly<T extends ElementType, P extends object = {}> {
  (Tag: T, props: P & ComponentPropsWithRef<T>): JSX.Element;
}

export interface PolyElement<T extends ElementType, P extends object> {
  <E extends ElementType = T>(props: PolyProps<E, P>): JSX.Element;

  [key: string]: any;
}

/*---------------------------------------------------------------------------*/

export interface CreatePolyElement<T extends ElementType> {
  <P extends object = {}>(render: RenderPoly<T, P>): PolyElement<T, P>;
}

export interface CreatePoly {
  <T extends ElementType>(tag: T): CreatePolyElement<T>;
}
