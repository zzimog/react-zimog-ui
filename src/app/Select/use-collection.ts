import { useRef } from 'react';

function sortByDocumentPosition(a: HTMLElement, b: HTMLElement) {
  if (a === b) return 0;
  return b.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_PRECEDING
    ? -1
    : 1;
}

export function useCollection() {
  const itemsRef = useRef(new Set<HTMLElement>());

  return useRef({
    getItems() {
      return Array.from(itemsRef.current).sort(sortByDocumentPosition);
    },
    addItem(item: HTMLElement) {
      itemsRef.current.add(item);
    },
    removeItem(item: HTMLElement) {
      itemsRef.current.delete(item);
    },
  }).current;
}
