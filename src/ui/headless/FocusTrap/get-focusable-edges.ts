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

function isHidden(node: HTMLElement, container: HTMLElement) {
  while (node) {
    if (node === container) {
      return false;
    }

    const styles = getComputedStyle(node);
    if (styles.display === 'none' || styles.visibility === 'hidden') {
      return true;
    }

    node = node.parentElement as HTMLElement;
  }
}

function findFirstVisible(elements: HTMLElement[], container: HTMLElement) {
  for (const element of elements) {
    if (!isHidden(element, container)) {
      return element;
    }
  }

  return null;
}

export function getFocusableEdges(container: HTMLElement) {
  const focusables = getFocusables(container);
  const first = findFirstVisible(focusables, container);
  const last = findFirstVisible(focusables.reverse(), container);

  return [first, last] as const;
}
