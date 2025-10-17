import type { JSX } from 'react';
import type { CreatePoly, CreatePolyElement } from './types';
import { createPoly } from './create-poly';
import { tags } from './tags';

type PolyTags = {
  [Tag in keyof JSX.IntrinsicElements]: CreatePolyElement<Tag>;
};

interface CreatePolymorphic extends CreatePoly, PolyTags {}

export const poly = createPoly.bind(null) as CreatePolymorphic;

tags.forEach((tag) => {
  (poly as any)[tag] = createPoly(tag as keyof typeof poly);
});
