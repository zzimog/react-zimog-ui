import type { ElementType } from 'react';
import type { RenderPoly, PolyProps } from './types';

export function createPoly(tag: ElementType) {
  const createPolyElement = (render: RenderPoly<ElementType, object>) => {
    const PolyElement = (inProps: PolyProps<ElementType, object>) => {
      const { as, ...rest } = inProps;
      const Comp = as || tag;

      return render(Comp, rest);
    };

    return PolyElement;
  };

  return createPolyElement;
}
