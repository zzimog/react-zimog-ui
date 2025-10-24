/**
 * Inspired from emotion styled/react component
 *
 * Ref: https://github.com/emotion-js/emotion/blob/main/packages/styled/src/index.ts
 */

import type { JSX } from 'react';
import type { CreatePolyElement, CreatePoly } from './types';
import { tags } from './tags';
import { createPoly } from './create-poly';

type PolyTags = {
  [Tag in keyof JSX.IntrinsicElements]: CreatePolyElement<Tag>;
};

interface CreatePolymorphic extends CreatePoly, PolyTags {}

export const poly = createPoly.bind(null) as CreatePolymorphic;

tags.forEach((tag) => {
  (poly as any)[tag] = createPoly(tag as keyof Omit<typeof poly, 'compose'>);
});
