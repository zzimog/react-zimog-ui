import { useCallback, type RefCallback } from 'react';

function getFocusables(container: HTMLElement) {
  const nodes: HTMLElement[] = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node: any) => {
      const isHiddenInput = node.tagName === 'INPUT' && node.type === 'hidden';
      if (node.disabled || node.hidden || isHiddenInput) {
        return NodeFilter.FILTER_SKIP;
      }

      return node.tabIndex >= 0
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_SKIP;
    },
  });

  while (walker.nextNode()) {
    nodes.push(walker.currentNode as HTMLElement);
  }

  return nodes;
}

function getFocusableEdges(container: HTMLElement) {
  const focusables = getFocusables(container);
  const first = focusables[0];
  const last = focusables[focusables.length - 1];

  return [first, last];
}

export function useFocusScope<T extends HTMLElement>(): RefCallback<T> {
  //const prevFocusRef = useRef<HTMLElement>(null);

  return useCallback((node: T) => {
    const [first] = getFocusableEdges(node);
    first?.focus();

    /*
    function handleFocusIn(event: Event) {
      const target = event.target as HTMLElement;
      if (node) {
        const [first, last] = getFocusableEdges(node);
        const prevFocus = prevFocusRef.current;

        if (!node.contains(target)) {
          if (prevFocus === first) {
            last.focus();
            prevFocusRef.current = last;
          }

          if (prevFocus === last) {
            first.focus();
            prevFocusRef.current = first;
          }
        } else {
          prevFocusRef.current = target;
        }
      }
    }
    */

    function handleKeydown(event: KeyboardEvent) {
      if (node) {
        const focusables = getFocusables(node);
        const [first, last] = getFocusableEdges(node);
        const current = document.activeElement as HTMLElement;
        const currentIndex = current ? focusables.indexOf(current) : -1;
        let newIndex = undefined;

        if (event.key === 'ArrowUp') {
          newIndex = currentIndex - 1;

          if (newIndex < 0) {
            newIndex = focusables.length - 1;
          }
        } else if (event.key === 'ArrowDown') {
          newIndex = currentIndex + 1;

          if (newIndex === focusables.length) {
            newIndex = 0;
          }
        }

        if (newIndex !== undefined) {
          const element = focusables[newIndex];
          element.scrollIntoView({ block: 'nearest' });
          if (element === first) node.scrollTop = 0;
          if (element === last) node.scrollTop = node.scrollHeight;
          element.focus();
          event.preventDefault();
        }
      }
    }

    //window.addEventListener('focusin', handleFocusIn);
    window.addEventListener('keydown', handleKeydown);
    return () => {
      //window.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);
}
