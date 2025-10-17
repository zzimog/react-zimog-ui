import type { ComponentPropsWithRef, ElementType, JSX } from 'react';
import { tags } from './tags';

/* prettier-ignore */
type PolyProps<
  T extends ElementType,
  P extends object = {}
> = {
  as?: T;
} & P & Omit<ComponentPropsWithRef<T>, 'as'>;

/* prettier-ignore */
type RenderPoly<
  T extends ElementType,
  P extends object = {}
> = (
  Tag: T,
  props: Omit<PolyProps<T, P>, 'as'>
) => JSX.Element;

type PolyComponent<E extends ElementType, P extends object = {}> = (
  props: PolyProps<E, P>
) => JSX.Element;

type CreatePolyElement<T extends ElementType, P extends object = {}> = (
  render: RenderPoly<T, P>
) => PolyComponent<T, P>;

function createPoly<T extends ElementType>(tag: T) {
  const createPolyElement = <P extends object = {}>(
    render: RenderPoly<T, P>
  ) => {
    const PolyElement = <E extends ElementType = T>(
      inProps: PolyProps<E, P>
    ) => {
      const { as, ...rest } = inProps;
      const Comp = as || tag;

      return (render as RenderPoly<typeof Comp, P>)(Comp, rest);
    };

    return PolyElement;
  };

  return createPolyElement;
}

type CreatePoly = typeof createPoly & {};

export const poly: CreatePoly = createPoly.bind(null);

(poly as any).div = createPoly('div');
