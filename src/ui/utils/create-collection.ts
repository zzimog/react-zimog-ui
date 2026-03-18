import { createElement, useRef, type PropsWithChildren } from 'react';
import { createScopedContext } from '@ui/utils';

function sortByDocumentPosition(a: HTMLElement, b: HTMLElement) {
  if (a === b) return 0;
  else {
    const position = a.compareDocumentPosition(b);
    if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
      return -1;
    }
    return 1;
  }
}

export function createCollection<
  E extends HTMLElement = HTMLElement,
  T extends {} = {},
>(name: string) {
  const COLLECTION_NAME = name + 'Collection';
  const ITEM_NAME = COLLECTION_NAME + 'Item';

  interface CollectionContextValue {
    getItems(): T[];
    onItemAdd(item: E, data?: T): void;
    onItemRemove(item: E): void;
  }

  const [CollectionContext, useCollectionContext] = createScopedContext<
    CollectionContextValue | undefined
  >(COLLECTION_NAME, undefined);

  const Collection = (inProps: PropsWithChildren) => {
    const { children } = inProps;

    const itemsRef = useRef<Map<E, T>>(new Map());
    const orderedRef = useRef<T[]>(null);

    const props = useRef({
      getItems(): T[] {
        if (!orderedRef.current) {
          const entries = itemsRef.current.entries();
          orderedRef.current = Array.from(entries)
            .sort((a, b) => sortByDocumentPosition(a[0], b[0]))
            .map(([_, data]) => data);
        }

        return orderedRef.current;
      },
      onItemAdd(item: E, data: T) {
        itemsRef.current.set(item, data);
        orderedRef.current = null;
      },
      onItemRemove(item: E) {
        itemsRef.current.delete(item);
        orderedRef.current = null;
      },
    }).current;

    return createElement(CollectionContext, props, children);
  };

  Collection.displayName = COLLECTION_NAME;

  function useCollection() {
    return useCollectionContext(ITEM_NAME);
  }

  return [Collection, useCollection] as const;
}
