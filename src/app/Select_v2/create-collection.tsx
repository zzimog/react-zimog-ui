import { useRef, type PropsWithChildren } from 'react';
import { createScopedContext } from '@ui/utils';

export function createCollection<
  E extends HTMLElement = HTMLElement,
  T extends {} = {},
>(name: string) {
  const COLLECTION_NAME = name + 'Collection';
  const ITEM_NAME = COLLECTION_NAME + 'Item';

  type CollectionContextValue<Data extends {}> = {
    getItems(): Data[];
    onItemAdd(item: E, data?: Data): void;
    onItemRemove(item: E): void;
  };

  const [CollectionContext, useCollectionContext] = createScopedContext<
    CollectionContextValue<T> | undefined
  >(COLLECTION_NAME, undefined);

  const Collection = (inProps: PropsWithChildren) => {
    const { children } = inProps;
    const items = useRef(new Map());

    return (
      <CollectionContext
        getItems={() => {
          return Array.from(items.current.values());
        }}
        onItemAdd={(item: E, data?: T) => {
          items.current.set(item, data || {});
        }}
        onItemRemove={(item: E) => {
          items.current.delete(item);
        }}
      >
        {children}
      </CollectionContext>
    );
  };

  Collection.displayName = COLLECTION_NAME;

  function useCollection() {
    const context = useCollectionContext(ITEM_NAME);
    return context;
  }

  return [Collection, useCollection] as const;
}
