import type { RefObject } from 'react';

export function mergedRefs<T = HTMLElement>(...refs: RefObject<T>[]) {
  return (node: T) => {
    for (const ref of refs) {
      ref.current = node;
    }
  };
}
