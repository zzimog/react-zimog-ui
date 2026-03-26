function isInput(element: HTMLElement): element is HTMLInputElement {
  return element.tagName === 'INPUT';
}

function getFocusables(container: HTMLElement) {
  const element: HTMLElement[] = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    acceptNode: (node: any) => {
      const isHidden = isInput(node) && node.type === 'hidden';
      if (node.disabled || node.hidden || isHidden) {
        return NodeFilter.FILTER_SKIP;
      }

      return node.tabIndex >= 0
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_SKIP;
    },
  });

  while (walker.nextNode()) {
    element.push(walker.currentNode as HTMLElement);
  }

  return element;
}

function findFirstVisible(elements: HTMLElement[], container: HTMLElement) {
  return elements.find((element) => {
    let current: HTMLElement | null = element;
    while (current) {
      const styles = getComputedStyle(current);

      if (
        styles.display === 'none' ||
        styles.display === 'contents' ||
        styles.visibility === 'hidden' ||
        styles.opacity === '0'
      ) {
        return false;
      }

      if (current === container) {
        break;
      }

      current = current.parentElement;
    }

    return true;
  });
}

export function getFocusableEdges(container: HTMLElement) {
  const focusables = getFocusables(container);
  const first = findFirstVisible(focusables, container);
  const last = findFirstVisible(focusables.reverse(), container);

  return [first, last] as const;
}
