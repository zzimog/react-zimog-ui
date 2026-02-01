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

    const items = useRef(new Map());

    const props = {
      getItems() {
        const keys = Array.from(items.current.keys());
        const ordered = keys.sort(sortByDocumentPosition);

        return ordered.map((key) => items.current.get(key));
      },
      onItemAdd(item: E, data?: T) {
        items.current.set(item, data || {});
      },
      onItemRemove(item: E) {
        items.current.delete(item);
      },
    };

    return createElement(CollectionContext, { ...props, children });
  };

  Collection.displayName = COLLECTION_NAME;

  function useCollection() {
    return useCollectionContext(ITEM_NAME);
  }

  return [Collection, useCollection] as const;
}
